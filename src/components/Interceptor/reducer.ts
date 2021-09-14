import * as C from './constants';

const intialState = {
  interceptPattern: '*/data//config.json*',
  messages: [],
  intercepting: false,
};

const setInterceptPattern = (state, action) => {
  const { interceptPattern } = action;
  return {
    ...state,
    interceptPattern,
  };
};

const setInterceptMessage = (state, action) => {
  const { message } = action;
  const { messages } = state;
  return {
    ...state,
    messages: messages.concat(message),
  };
};

const clearCard = (state, action) => {
  const { cardId } = action;
  const { messages } = state;
  if (cardId) {
    return {
      ...state,
      messages: messages.filter((msg) => msg.id !== cardId),
    };
  }
  return {
    ...state,
    messages: [],
  };
};

const setIntercepting = (state, action) => {
  const { intercepting } = action;
  return {
    ...state,
    intercepting,
  };
};

const interceptReducer = (state = intialState, action) => {
  switch (action.type) {
    case C.SET_INTERCEPT_MSG:
      return setInterceptMessage(state, action);

    case C.SET_INTERCEPT_PATTERN:
      return setInterceptPattern(state, action);

    case C.CLEAR_CARD:
      return clearCard(state, action);

    case C.SET_INTERCEPTING:
      return setIntercepting(state, action);

    default: {
      return state;
    }
  }
};

export default interceptReducer;
