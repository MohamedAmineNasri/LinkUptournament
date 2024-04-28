import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  error: null,
};

export const addPlayer = (payload) => async (dispatch) => {
  dispatch(postDataPending());
  try {
    await axios.post("http://localhost:8000/player/", payload);
    dispatch(postDataFulfilled());
  } catch (error) {
    dispatch(postDataRejected(error.message));
  }
};
export const addPlayerMi = (payload) => async (dispatch) => {
  dispatch(postDataPending());
  try {
    await axios.post("http://localhost:8000/player/addPlayer/", payload);
    dispatch(postDataFulfilled());
  } catch (error) {
    dispatch(postDataRejected(error.message));
  }
};

const addPlayerSlice = createSlice({
  name: "add-player",
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

export default addPlayerSlice.reducer;
