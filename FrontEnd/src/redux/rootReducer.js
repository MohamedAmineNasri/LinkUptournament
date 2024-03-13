import { combineReducers } from '@reduxjs/toolkit';
import tournamentReducer from './slice/tournamentSlice';
import teamReducer from './slice/teamSlice';
import groupReducer from './slice/groupSlice';

const rootReducer = combineReducers({
  tournament : tournamentReducer ,
  team: teamReducer ,
  group : groupReducer , 
});

export default rootReducer;