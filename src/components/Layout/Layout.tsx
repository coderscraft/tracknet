import React, { useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = (props) => {
  const { children } = props;
  return (
    <div>
      {children}
      {/* <Header /> */}
      <Footer />
    </div>
  );
};

export default Layout;
