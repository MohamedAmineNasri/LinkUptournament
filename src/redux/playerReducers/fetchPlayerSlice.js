import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    //players = 
  status: "idle",
  error: null,
};

export const addPlayer = () => async (dispatch) => {
  dispatch(postDataPending());
  try {
    await axios.get("http://localhost:8000/player");
    dispatch(postDataFulfilled());
  } catch (error) {
    dispatch(postDataRejected(error.message));
  }
};

const fetchPlayerSlice = createSlice({
  name: "fetch-player",
  initialState,
  reducers: {
    postDataPending: (state) => {
      state.status = "loading";
    },
    postDataFulfilled: (state) => {
      state.status = "succeeded";
    },
    postDataRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const { postDataPending, postDataFulfilled, postDataRejected } =
  addPlayerSlice.actions;

export default fetchPlayerSlice.reducer;
