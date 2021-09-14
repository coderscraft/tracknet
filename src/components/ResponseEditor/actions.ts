import * as C from './constants';

export const setRespEditorFun = (editFun: string) => ({
  type: C.SET_RESPONSE_EDITOR_FUN,
  editFun,
});

export const setRespEditorIntercepting = () => ({
  type: C.RESPONSE_EDITOR_INTERCEPTING,
});

export const setResponseEditorUrl = (respEditorUrl: string) => ({
  type: C.SET_RESPONSE_EDITOR_URL,
  respEditorUrl,
});

export const setUpdatedResponse = (message) => ({
  type: C.SET_UPDATED_RESPONSE,
  message,
});
