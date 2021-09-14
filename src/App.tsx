import React, { useEffect } from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import HomePage from './components/HomePage';
import ChromeLauncher from './components/ChromeLauncher';
import Intereceptor from './components/Interceptor';
import ResponseEditor from './components/ResponseEditor';
import Layout from './components/Layout';
import store from './store';
import init from './listeners';
import './App.global.css';

const ChildPages = () => {
  return (
    <Layout>
      <Switch>
        <Route exact path="/chromelauncher" component={ChromeLauncher} />
        <Route exact path="/interceptor" component={Intereceptor} />
        <Route exact path="/responseeditor" component={ResponseEditor} />
      </Switch>
    </Layout>
  );
};

export default function App() {
  useEffect(() => {
    init();
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route component={ChildPages} />
        </Switch>
      </Router>
    </Provider>
  );
}
