import * as C from './constants';

export const setInterceptPattern = (interceptPattern: string) => ({
  type: C.SET_INTERCEPT_PATTERN,
  interceptPattern,
});

export const setInterceptMsg = (message) => ({
  type: C.SET_INTERCEPT_MSG,
  message,
});

export const clearCard = (cardId: string) => ({
  type: C.CLEAR_CARD,
  cardId,
});

export const setIntercepting = (isIntercepting: boolean) => ({
  type: C.SET_INTERCEPTING,
  intercepting: isIntercepting,
});
