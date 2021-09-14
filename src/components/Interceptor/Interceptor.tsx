import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, Card } from 'antd';
import { CloseOutlined, CheckCircleOutlined } from '@ant-design/icons';
import {
  launchPortSelector,
  interceptPatternSelector,
  interceptMessagesSelector,
  isInterceptingSelector,
} from '../../selector';
import { setInterceptPattern, clearCard } from './actions';
import Toolbar from '../Toolbar';
import JSONFormator from '../JSONFormator';
import PageContainer from '../PageContainer';
import style from './style.scss';
import globalCss from '../../app.scss';

const { ipcRenderer } = require('electron');

const Interceptor = () => {
  const portNo = useSelector(launchPortSelector);
  const interceptPattern = useSelector(interceptPatternSelector);
  const messages = useSelector(interceptMessagesSelector);
  const intercepting = useSelector(isInterceptingSelector);
  const dispatch = useDispatch();

  const onInterceptPatternChange = (e) => {
    dispatch(setInterceptPattern(e.target.value));
  };

  const onIntercept = () => {
    ipcRenderer.send('network-intercept', {
      portNo,
      interceptPattern,
    });
  };

  const clearCardId = (id: string) => {
    dispatch(clearCard(id));
  };

  return (
    <PageContainer toolBarRenderer={<Toolbar selectedTab="intercept" />}>
      <div className={style.startInterceptContainer}>
        <div className={style.interceptLabelContainer}>
          <span>URL Pattern</span>
          {intercepting ? (
            // <CheckCircleOutlined className={style.interceptingIcon} />
            <div className={`${globalCss.icon} ${globalCss.online}`} />
          ) : (
            <div className={`${globalCss.icon} ${globalCss.offline}`} />
          )}
        </div>
        <Input
          style={{ width: 'calc(100% - 102px)', marginRight: 15 }}
          onChange={onInterceptPatternChange}
          value={interceptPattern}
        />
        <Button onClick={onIntercept} type="primary">
          Intercept
        </Button>
      </div>
      <div className={style.interceptMsgCardContainer}>
        <Button type="link" onClick={() => clearCardId()} size="small">
          Clear All
        </Button>
        {messages.map((msg) => (
          <Card
            className={style.interceptMsgCard}
            key={msg.id}
            title={`URL: ${msg.url}`}
            extra={
              <CloseOutlined
                onClick={() => clearCardId(msg.id)}
                style={{ fontSize: '18px', color: '#08c' }}
              />
            }
          >
            <p>bodyData</p>
            <JSONFormator jsonStr={msg.bodyData} />
          </Card>
        ))}
      </div>
    </PageContainer>
  );
};

export default Interceptor;
