import { combineReducers } from '@reduxjs/toolkit';
import teamReducer from './slice/teamSlice';
import academyReducer from './slice/academySlice'
import matchReducer from './slice/matchSlice'
const rootReducer = combineReducers({
   match:matchReducer
  });
  
  export default rootReducer;