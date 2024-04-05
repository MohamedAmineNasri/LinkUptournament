import { combineReducers } from '@reduxjs/toolkit';
import teamReducer from './slice/teamSlice';
import academyReducer from './slice/academySlice'
import groupReducer from './slice/groupSlice';
import tournamentReducer from './slice/tournamentSlice';
import matchReducer from './slice/matchSlice';

import addPlayerSlice from "./playerReducers/addPlayerSlice";
import fetchPlayerSlice from "./playerReducers/fetchPlayerSlice";
import updatePlayerSlice from "./playerReducers/updatePlayerSlice";
import deletePlayerSlice from "./playerReducers/deletePlayerSlice";
import addRefereeSlice from "./refereeReducers/addRefereeSlice";
import fetchRefereeSlice from "./refereeReducers/fetchRefereeSlice";
import updateRefereeSlice from "./refereeReducers/updateRefereeSlice";
import deleteRefereeSlice from "./refereeReducers/deleteRefereeSlice";

export const rootReducer = combineReducers({
  team: teamReducer,
  academy : academyReducer ,
  tournament : tournamentReducer ,
  group : groupReducer , 
  match: matchReducer , 
  createPlayer: addPlayerSlice,
  fetchPlayers: fetchPlayerSlice,
  updatePlayer: updatePlayerSlice,
  deletePlayer: deletePlayerSlice,
  createReferee: addRefereeSlice,
  fetchReferees: fetchRefereeSlice,
  updateReferee: updateRefereeSlice,
  deleteReferee: deleteRefereeSlice,
});

export default rootReducer;



