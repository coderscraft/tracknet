import React from 'react';
import { Button } from 'antd';
import { NavLink } from 'react-router-dom';
import styles from './style.scss';

const HomePage = () => {
  const tilesConfig = [
    {
      key: 'launcher',
      text:
        'Your Launch Chrome Instance, customize launch options and terminate existing instance',
      tileClass: styles.homePageLauncher,
      path: '/chromelauncher',
    },
    {
      key: 'intercepter',
      text: 'Analyze network traffic for URL pattern',
      tileClass: styles.homePageIntercept,
      path: '/interceptor',
    },
    {
      key: 'responseeditor',
      text: 'Modify API response and remove unwanted scripts',
      tileClass: styles.homePageResponseEditor,
      path: '/responseeditor',
    },
    {
      key: 'account',
      text: 'Create account, profiles, manage and view configuration',
      tileClass: styles.homePageAccount,
      path: '/',
    },
  ];

  return (
    <div className={styles.homePageContainer}>
      <div className={styles.homePageContentWrapper}>
        <div className={styles.homePageTitle}>Network traffic analyzer</div>
        <div className={styles.homePageTilesContainer}>
          {tilesConfig.map((tiles) => (
            <NavLink
              key={tiles.key}
              exact
              activeClassName="active"
              to={tiles.path}
            >
              <div className={styles.homePageTiles}>
                <div
                  className={`${tiles.tileClass} ${styles.homePageTilesIcon}`}
                />
                <span>{tiles.text}</span>
              </div>
            </NavLink>
          ))}
        </div>
        <Button type="primary" className={styles.homePageMoreDetails}>
          More Details
        </Button>
      </div>
    </div>
  );
};

export default HomePage;
