import { combineReducers } from '@reduxjs/toolkit';
import matchReducer from './slice/matchSlice';

const rootReducer = combineReducers({
  match: matchReducer
});

export default rootReducer;