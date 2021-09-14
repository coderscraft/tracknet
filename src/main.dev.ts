/* eslint-disable @typescript-eslint/no-implied-eval */
/* eslint global-require: off, no-console: off */

/**
 * This module executes inside of electron's main process. You can start
 * electron renderer process from here and communicate with the other processes
 * through IPC.
 *
 * When running `yarn build` or `yarn build:main`, this file is compiled to
 * `./src/main.prod.js` using webpack. This gives us some performance wins.
 */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import { app, BrowserWindow, shell } from 'electron';
import installExtension, {
  REACT_DEVELOPER_TOOLS,
  REDUX_DEVTOOLS,
} from 'electron-devtools-installer';
import { autoUpdater } from 'electron-updater';
import log from 'electron-log';
import MenuBuilder from './menu';

const atob = require('atob');
const btoa = require('btoa');

const CDP = require('chrome-remote-interface');

const ChromeLauncher = require('chrome-launcher');

const { ipcMain } = require('electron');

const startup = () => {
  if (typeof String.prototype.parseFunction !== 'function') {
    String.prototype.parseFunction = function () {
      const funcReg = /function *\(([^()]*)\)[ \n\t]*{(.*)}/gim;
      const match = funcReg.exec(this.replace(/\n/g, ' '));

      if (match) {
        return new Function(match[1].split(','), match[2]);
      }

      return null;
    };
  }
};

startup();

export default class AppUpdater {
  constructor() {
    log.transports.file.level = 'info';
    autoUpdater.logger = log;
    autoUpdater.checkForUpdatesAndNotify();
  }
}

let mainWindow: BrowserWindow | null = null;

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = [REACT_DEVELOPER_TOOLS, REDUX_DEVTOOLS];
  // const extensions = ['REACT_DEVELOPER_TOOLS'];

  return installExtension(extensions, {
    loadExtensionOptions: { allowFileAccess: true },
    forceDownload,
  }).catch(console.log);

  // return installer
  //   .default(
  //     extensions.map((name) => installer[name]),
  //     forceDownload
  //   )
  //   .catch(console.log);
};

const createWindow = async () => {
  if (
    process.env.NODE_ENV === 'development' ||
    process.env.DEBUG_PROD === 'true'
  ) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      nodeIntegration: true,
      devTools: true,
    },
  });

  mainWindow.loadURL(`file://${__dirname}/index.html`);

  // @TODO: Use 'ready-to-show' event
  //        https://github.com/electron/electron/blob/master/docs/api/browser-window.md#using-ready-to-show-event
  mainWindow.webContents.on('did-finish-load', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
      mainWindow.focus();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });

  // Remove this if your app does not use auto updates
  // eslint-disable-next-line
  new AppUpdater();
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.whenReady().then(createWindow).catch(console.log);

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) createWindow();
});

ipcMain.on('launch-chrome', async (event, arg) => {
  const launchParam = {};
  launchParam.chromeFlags = ['--window-size=1200,800', '--disable-gpu'];
  if (arg) {
    if (arg.launchUrl) {
      launchParam.startingUrl = arg.launchUrl;
    }
  }
  const chrome = await ChromeLauncher.launch(launchParam);
  event.returnValue = chrome.port;
});

ipcMain.on('network-intercept', async (event, arg) => {
  const { portNo, interceptPattern } = arg;
  if (portNo && interceptPattern) {
    const cdpProtocol = await CDP({ port: portNo });
    const { Runtime, Network } = cdpProtocol;
    await Promise.all([Runtime.enable(), Network.enable()]);
    await Network.setRequestInterception({
      patterns: [
        {
          urlPattern: interceptPattern,
          interceptionStage: 'HeadersReceived',
        },
      ],
    });

    mainWindow.webContents.send('network-intercepting', { intercepting: true });

    Network.requestIntercepted(async ({ interceptionId, request }) => {
      const response = await Network.getResponseBodyForInterception({
        interceptionId,
      });
      const bodyData = response.base64Encoded
        ? atob(response.body)
        : response.body;
      mainWindow.webContents.send('network-intercept-msg', {
        id: Date.now(),
        url: request.url,
        bodyData,
      });
      Network.continueInterceptedRequest({
        interceptionId,
      });
    });
  }
});

ipcMain.on('response-editor-intercept', async (event, arg) => {
  const { portNo, url, interceptFun } = arg;
  if (portNo) {
    const cdpProtocol = await CDP({ port: portNo });
    const { Runtime, Network } = cdpProtocol;
    await Promise.all([Runtime.enable(), Network.enable()]);
    if (url) {
      await Network.setRequestInterception({
        patterns: [
          {
            urlPattern: url,
            interceptionStage: 'HeadersReceived',
          },
        ],
      });

      mainWindow.webContents.send('response-editor-intercepting', {
        intercepting: true,
      });

      Network.requestIntercepted(async ({ interceptionId, request }) => {
        console.log(
          `Intercepted ${request.url} {interception id: ${interceptionId}}`
        );

        const response = await Network.getResponseBodyForInterception({
          interceptionId,
        });

        mainWindow.webContents.send('intercepted-msg', { data: response });

        const bodyData = response.base64Encoded
          ? atob(response.body)
          : response.body;

        const processFun = interceptFun.parseFunction();
        const newBodyData = processFun(bodyData);

        mainWindow.webContents.send('modified-response', {
          bodyData: newBodyData,
        });

        const newHeaders = [
          `Date: ${new Date().toUTCString()}`,

          'Connection: closed',

          `Content-Length: ${newBodyData.length}`,

          'Content-Type: text/javascript',

          'access-control-allow-origin: *',
        ];

        Network.continueInterceptedRequest({
          interceptionId,

          rawResponse: btoa(
            `${'HTTP/1.1 200 OK' + '\r\n'}${newHeaders.join(
              '\r\n'
            )}\r\n\r\n${newBodyData}`
          ),
        });
      });
    }
  }
  event.returnValue = 'Hello';
});
