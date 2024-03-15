import { combineReducers } from '@reduxjs/toolkit';
import teamReducer from './slice/teamSlice';
import academyReducer from './slice/academySlice'
import groupReducer from './slice/groupSlice';
import tournamentReducer from './slice/tournamentSlice';

const rootReducer = combineReducers({
  team: teamReducer,
  academy : academyReducer ,
  tournament : tournamentReducer ,
  group : groupReducer , 
});

export default rootReducer;



