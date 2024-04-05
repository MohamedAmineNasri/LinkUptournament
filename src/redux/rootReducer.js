import { combineReducers } from "@reduxjs/toolkit";
import teamReducer from "./slice/teamSlice";
import academyReducer from "./slice/academySlice";
import matchReducer from "./slice/matchSlice";
import addPlayerSlice from "./playerReducers/addPlayerSlice";
import tournamentSlice from "./slice/tournamentSlice";
import groupSlice from "./slice/groupSlice";
const rootReducer = combineReducers({
  team: teamReducer,
  academy: academyReducer,
  match: matchReducer,
  createPlayer: addPlayerSlice,
  tournament : tournamentSlice ,
  group : groupSlice
});

export default rootReducer;
