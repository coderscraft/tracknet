import { combineReducers } from 'redux';
import homeReducer from './components/HomePage/reducer';
import interceptReducer from './components/Interceptor/reducer';
import respEditorReducer from './components/ResponseEditor/reducer';

export default combineReducers({
  homeReducer,
  interceptReducer,
  respEditorReducer,
});
