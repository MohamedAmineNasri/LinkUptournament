import { combineReducers } from '@reduxjs/toolkit';
import tournamentReducer from './slice/tournamentSlice';

const rootReducer = combineReducers({
  tournament : tournamentReducer
});

export default rootReducer;