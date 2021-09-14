import React from 'react';
import { Button } from 'antd';
import styles from './style.scss';

export interface ActionBarProps {
  /**
   * Optional close popup handler
   */
  onLaunch: () => void;
}

const ActionBar: React.FC<ActionBarProps> = ({ onLaunch }) => {
  return (
    <div className={styles.actionbarContainer}>
      <Button onClick={onLaunch} type="primary">
        Launch
      </Button>
    </div>
  );
};

export default ActionBar;
