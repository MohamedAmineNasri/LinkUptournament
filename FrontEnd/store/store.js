import { configureStore } from "@reduxjs/toolkit";
import addPlayerSlice from "./playerReducers/addPlayerSlice";
import { composeWithDevTools } from "@redux-devtools/extension";

export default configureStore({
  reducer: {
    addPlayerData: addPlayerSlice,
  },
  composeWithDevTools,
});
