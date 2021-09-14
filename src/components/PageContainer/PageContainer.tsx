import React from 'react';
import style from './style.scss';

const PageContainer = (props) => {
  const { toolBarRenderer, children } = props;
  return (
    <div>
      <div className={style.chromeLauncherLeftPanel}>{toolBarRenderer}</div>
      <div className={style.chromeLauncherRightPanel}>{children}</div>
    </div>
  );
};

export default PageContainer;
