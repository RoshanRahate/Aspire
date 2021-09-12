import { combineReducers } from "redux";
import uiReducer from './uiReducer';

export default combineReducers({
  debitCardDetails: uiReducer,
});