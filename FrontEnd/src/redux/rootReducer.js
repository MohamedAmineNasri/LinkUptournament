import { combineReducers } from '@reduxjs/toolkit';
import teamReducer from './slice/teamSlice';
import academyReducer from './slice/academySlice'

export const rootReducer = combineReducers({
  team: teamReducer,
  academy : academyReducer
});

export default rootReducer;
