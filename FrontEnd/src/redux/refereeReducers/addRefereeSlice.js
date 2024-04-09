import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchReferees } from "./fetchRefereeSlice";

const initialState = {
  status: "idle",
  error: null,
};

export const addReferee = (payload) => async (dispatch) => {
  dispatch(postDataPending());
  try {
    await axios.post("http://localhost:8000/referee", payload);
    dispatch(postDataFulfilled());
    dispatch(fetchReferees());
  } catch (error) {
    dispatch(postDataRejected(error.message));
  }
};

const addRefereeSlice = createSlice({
  name: "add-referee",
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
  addRefereeSlice.actions;

export default addRefereeSlice.reducer;
