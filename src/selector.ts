import { createSelector } from 'reselect';

const homePageSelector = (state) => state.homeReducer;
const interceptSelector = (state) => state.interceptReducer;
const respEditorSelector =  (state) => state.respEditorReducer;

export const launchUrlSelector = createSelector(
  homePageSelector,
  (homePage) => homePage.launchUrl
);

export const launchProtocolSelector = createSelector(
  homePageSelector,
  (homePage) => homePage.protocol
);

export const launchPortSelector = createSelector(
  homePageSelector,
  (homePage) => homePage.port
);

export const interceptPatternSelector = createSelector(
  interceptSelector,
  (intercept) => intercept.interceptPattern
);

export const interceptMessagesSelector = createSelector(
  interceptSelector,
  (intercept) => intercept.messages
);

export const isInterceptingSelector = createSelector(
  interceptSelector,
  (intercept) => intercept.intercepting
);

export const isRespEditorIntercepting = createSelector(
  respEditorSelector,
  (respEditor) => respEditor.intercepting
);

export const respEditorUrlSelector = createSelector(
  respEditorSelector,
  (respEditor) => respEditor.url
);

export const respEditorInterceptFun = createSelector(
  respEditorSelector,
  (respEditor) => respEditor.interceptFun
);

export const respEditorMsgSelector = createSelector(
  respEditorSelector,
  (respEditor) => respEditor.message
);
