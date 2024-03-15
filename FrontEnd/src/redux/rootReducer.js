import { combineReducers } from '@reduxjs/toolkit';
import teamReducer from './slice/teamSlice';
import academyReducer from './slice/academySlice'
import matchReducer from './slice/matchSlice';

export const rootReducer = combineReducers({
  team: teamReducer,
  academy : academyReducer,
  match: matchReducer
});

export default rootReducer;
