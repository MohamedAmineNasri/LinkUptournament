import { combineReducers } from '@reduxjs/toolkit';
import teamReducer from './slice/teamSlice';

const rootReducer = combineReducers({
  team: teamReducer
});

export default rootReducer;
