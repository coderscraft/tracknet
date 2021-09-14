import React from 'react';
import { Input, Select, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import PageContainer from '../PageContainer';
import { setLaunchUrl, setProtocol, setChromePort } from '../HomePage/action';
import { launchUrlSelector, launchProtocolSelector } from '../../selector';
import Toolbar from '../Toolbar';

import style from './style.scss';

const { ipcRenderer } = require('electron');

const SelectBefore = () => {
  const dispatch = useDispatch();
  const protocol = useSelector(launchProtocolSelector);
  const handleChange = (value: string) => {
    dispatch(setProtocol(value));
  };

  return (
    <Select onChange={handleChange} value={protocol} className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
};

const ChromeLauncher = () => {
  const dispatch = useDispatch();
  const launchUrl = useSelector(launchUrlSelector);
  const protocol = useSelector(launchProtocolSelector);
  const onUrlChange = (e) => {
    dispatch(setLaunchUrl(e.target.value));
  };

  const onLaunch = async () => {
    const portNo = ipcRenderer.sendSync('launch-chrome', {
      launchUrl: `${protocol}${launchUrl}`,
    });
    if (portNo) {
      dispatch(setChromePort(portNo));
    }
  };

  return (
    <PageContainer toolBarRenderer={<Toolbar selectedTab="launch" />}>
      <Input
        onChange={onUrlChange}
        addonBefore={<SelectBefore />}
        value={launchUrl}
      />
      <div className={style.launchActionContainer}>
        <Button onClick={onLaunch} type="primary">
          Launch
        </Button>
      </div>
    </PageContainer>
  );
};
export default ChromeLauncher;
