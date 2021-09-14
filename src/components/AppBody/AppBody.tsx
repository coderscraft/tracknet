import React from 'react';
import { Input, Select } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { setLaunchUrl, setProtocol, setUrlInterceptPattern } from '../HomePage/action';
import styles from './style.scss';

const { TextArea } = Input;

const SelectBefore = () => {
  const dispatch = useDispatch();
  const handleChange = (value: string) => {
    dispatch(setProtocol(value));
  };

  return (
    <Select onChange={handleChange} defaultValue="http://" className="select-before">
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );
};

const AppBody = () => {
  const dispatch = useDispatch();
  const launchUrl = useSelector(state => state.HomeReducer.launchUrl);
  const onUrlChange = (e) => {
    dispatch(setLaunchUrl(e.target.value));
  };

  const onInterceptPatternChange = (e) => {
    dispatch(setUrlInterceptPattern(e.target.value));
  }

  return (
    <div className={styles.AppBodyContainer}>
      <Input
        onChange={onUrlChange}
        addonBefore={<SelectBefore />}
        value={launchUrl}
      />
      <div className={styles.urlInterceptContainer}>
        <Input onChange={onInterceptPatternChange} placeholder="URL Pattern" />
        <TextArea className={styles.urlInterceptTextArea} />
      </div>
    </div>
  );
};

export default AppBody;
