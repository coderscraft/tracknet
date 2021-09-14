/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.scss';

const Header = () => {
  return (
    <NavLink exact activeClassName="active" to="/">
      <div className={styles.headerHomeIcon} />;
    </NavLink>
  );
};

export default Header;
