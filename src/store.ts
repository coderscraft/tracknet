import { createStore, applyMiddleware, compose } from 'redux';
import reducer from './reducer';

const enhancers = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducer, {}, enhancers);

export default store;
