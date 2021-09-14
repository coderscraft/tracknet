import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button } from 'antd';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import Toolbar from '../Toolbar';
import {
  setRespEditorFun,
  setRespEditorIntercepting,
  setResponseEditorUrl,
} from './actions';
import {
  respEditorInterceptFun,
  respEditorUrlSelector,
  isRespEditorIntercepting,
  respEditorMsgSelector,
  launchPortSelector,
} from '../../selector';

import PageContainer from '../PageContainer';
import JSONFormator from '../JSONFormator';
import style from './style.scss';
import globalStyle from '../../app.scss';
import globalCss from '../../app.scss';

const { ipcRenderer } = require('electron');

const ResponseEditor = () => {
  const portNo = useSelector(launchPortSelector);
  const url = useSelector(respEditorUrlSelector);
  const interceptFun = useSelector(respEditorInterceptFun);
  const intercepting = useSelector(isRespEditorIntercepting);
  const msgSelector = useSelector(respEditorMsgSelector);

  const dispatch = useDispatch();
  const onInterceptPatternChange = (e) => {
    dispatch(setResponseEditorUrl(e.target.value));
  };

  const onSetResponse = () => {
    ipcRenderer.send('response-editor-intercept', {
      portNo,
      url,
      interceptFun,
    });
  };

  const onChange = (newValue) => {
    console.log('onChange', newValue);
    dispatch(setRespEditorFun(newValue));
  };

  return (
    <PageContainer toolBarRenderer={<Toolbar selectedTab="editor" />}>
      <div className={`${style.responseEditorContainer} ${globalStyle.border}`}>
        <div className={style.responseEditorLabelContainer}>
          <span>URL Pattern</span>
          {intercepting ? (
            // <CheckCircleOutlined className={style.interceptingIcon} />
            <div className={`${globalCss.icon} ${globalCss.online}`} />
          ) : (
            <div className={`${globalCss.icon} ${globalCss.offline}`} />
          )}
        </div>
        <Input
          style={{ marginBottom: 15 }}
          onChange={onInterceptPatternChange}
          value={url}
        />
      </div>
      <div className={`${style.responseEditorContainer} ${globalStyle.border}`}>
        <div className={style.responseEditorLabelContainer}>
          Response Editor
        </div>
        <AceEditor
          style={{ width: '100%', height: 250, marginBottom: 15 }}
          mode="javascript"
          theme="github"
          onChange={onChange}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{ $blockScrolling: true }}
          value={interceptFun}
        />
        <Button onClick={onSetResponse} type="primary">
          Set Response
        </Button>
      </div>
      {msgSelector ? (
        <div className={globalStyle.border}>
          <JSONFormator jsonStr={msgSelector.bodyData} />
        </div>
      ) : null}
    </PageContainer>
  );
};

export default ResponseEditor;
