import * as C from './constants';

const intialState = {
  url: '*/data//config.json*',
  intercepting: false,
  interceptFun: `function (bodyData) {
    const bodyObj = JSON.parse(bodyData);
    /* Add your code here */
    const newBody = JSON.stringify(bodyObj);
    return newBody;
  }`,
  message: null,
};

const setInterceptUrl = (state, action) => {
  const { respEditorUrl } = action;
  return {
    ...state,
    url: respEditorUrl,
  };
};

const setInterceptFun = (state, action) => {
  const { editFun } = action;
  return {
    ...state,
    interceptFun: editFun,
  };
};

const setIntercepting = (state) => {
  return {
    ...state,
    intercepting: true,
  };
};

const setUpdatedResponse = (state, action) => {
  const { message } = action;
  return {
    ...state,
    message,
  };
};

const respEditorReducer = (state = intialState, action) => {
  switch (action.type) {
    case C.RESPONSE_EDITOR_INTERCEPTING:
      return setIntercepting(state);

    case C.SET_RESPONSE_EDITOR_URL:
      return setInterceptUrl(state, action);

    case C.SET_RESPONSE_EDITOR_FUN:
      return setInterceptFun(state, action);

    case C.SET_UPDATED_RESPONSE:
      return setUpdatedResponse(state, action);

    default: {
      return state;
    }
  }
};

export default respEditorReducer;
