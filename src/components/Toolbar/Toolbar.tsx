import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.scss';

const Toolbar = (props) => {
  const { selectedTab } = props;
  const icons = [
    {
      name: 'home',
      class: styles.headerHomeIcon,
      path: '/',
    },
    {
      name: 'launch',
      class: styles.headerLaunchIcon,
      path: '/chromelauncher',
    },
    {
      name: 'intercept',
      class: styles.headerAnalyzeIcon,
      path: '/interceptor',
    },
    {
      name: 'editor',
      class: styles.headerEditIcon,
      path: '/responseeditor',
    },
    {
      name: 'profile',
      class: styles.headerAccountIcon,
      path: '/',
    },
  ];

  return (
    <>
      {icons.map((icon) => {
        return (
          <NavLink
            key={icon.name}
            exact
            activeClassName="active"
            to={icon.path}
          >
            <div
              className={`${icon.class} ${styles.icon} ${
                icon.name === selectedTab ? styles.selected : ''
              }`}
            />
          </NavLink>
        );
      })}
    </>
  );
};

export default Toolbar;
