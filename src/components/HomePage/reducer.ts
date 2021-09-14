import * as C from './constants';

const intialState = {
  launchUrl: 'happy-curie-fe7437.netlify.app/',
  protocol: 'https://',
  pattern: '*/data//config.json*',
  port: null,
  // processing: `const bodyObj = JSON.parse(bodyData);
  // if (bodyObj && bodyObj.propertySources) {
  //   bodyObj.propertySources[0].source.name = 'Ravi';
  // }
  // const newBody = JSON.stringify(bodyObj);
  // return newBody;`,

  processing: `const bodyObj = JSON.parse(bodyData);
  if (bodyObj) {
    bodyObj.navBarColor = '#FFFF00';
  }
  const newBody = JSON.stringify(bodyObj);
  return newBody;`,
};

const setLaunchUrl = (state, action) => {
  const { launchUrl } = action;
  return {
    ...state,
    launchUrl,
  };
};

const setProtocol = (state, action) => {
  const { protocol } = action;
  return {
    ...state,
    protocol,
  };
};

const setUrlInterceptPattern = (state, action) => {
  const { pattern } = action;
  return {
    ...state,
    pattern,
  };
};

const setChromePort = (state, action) => {
  const { port } = action;
  return {
    ...state,
    port,
  };
};

const setInterceptProcessing = (state, action) => {
  const { processing } = action;
  return {
    ...state,
    processing,
  };
};

const adminHomeReducer = (state = intialState, action) => {
  switch (action.type) {
    case C.SET_LAUNCH_URL:
      return setLaunchUrl(state, action);

    case C.SET_URL_PROTOCOL:
      return setProtocol(state, action);

    case C.SET_URL_INTERCEPT_PATTERN:
      return setUrlInterceptPattern(state, action);

    case C.SET_CHROME_PORT:
      return setChromePort(state, action);

    case C.SET_INTERCEPT_PROCESSING:
      return setInterceptProcessing(state, action);

    default: {
      return state;
    }
  }
};

export default adminHomeReducer;
