import * as C from './constants';

export const setLaunchUrl = (launchUrl: string) => ({
  type: C.SET_LAUNCH_URL,
  launchUrl,
});

export const setProtocol = (protocol: string) => ({
  type: C.SET_URL_PROTOCOL,
  protocol,
});

export const setUrlInterceptPattern = (pattern: string) => ({
  type: C.SET_URL_INTERCEPT_PATTERN,
  pattern,
});

export const setChromePort = (port: string) => ({
  type: C.SET_CHROME_PORT,
  port,
});

export const setInterceptProcessing = (processing: string) => ({
  type: C.SET_INTERCEPT_PROCESSING,
  processing,
});
