import {
  setInterceptMsg,
  setIntercepting,
} from './components/Interceptor/actions';
import {
  setRespEditorIntercepting,
  setUpdatedResponse,
} from './components/ResponseEditor/actions';
import store from './store';

const { ipcRenderer } = require('electron');

const init = () => {
  ipcRenderer.on('network-intercepting', (evt, message) => {
    store.dispatch(setIntercepting(true));
  });
  ipcRenderer.on('response-editor-intercepting', (evt, message) => {
    store.dispatch(setRespEditorIntercepting());
  });
  ipcRenderer.on('network-intercept-msg', (evt, message) => {
    store.dispatch(setInterceptMsg(message));
  });
  ipcRenderer.on('modified-response', (evt, message) => {
    store.dispatch(setUpdatedResponse(message));
  });
};

export default init;
