import { combineReducers } from '@reduxjs/toolkit';
import teamReducer from './slice/teamSlice';
import academyReducer from './slice/academySlice'
import groupReducer from './slice/groupSlice';
import tournamentReducer from './slice/tournamentSlice';
import matchReducer from './slice/matchSlice';
import achievementReducer from './slice/achievementSlice'
import tachievementSlice from './slice/tachievementSlice';


export const rootReducer = combineReducers({
  team: teamReducer,
  academy : academyReducer ,
  achievement:achievementReducer,
  tachievement :tachievementSlice,
  tournament : tournamentReducer ,
  group : groupReducer , 
  match: matchReducer , 
});

export default rootReducer;



