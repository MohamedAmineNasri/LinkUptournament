import { combineReducers } from '@reduxjs/toolkit';
import tournamentReducer from './slice/tournamentSlice';
import teamReducer from './slice/teamSlice';

const rootReducer = combineReducers({
  tournament : tournamentReducer ,
  team: teamReducer ,
});

export default rootReducer;