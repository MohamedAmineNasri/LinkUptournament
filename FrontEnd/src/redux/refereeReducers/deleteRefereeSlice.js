import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchReferees } from "./fetchRefereeSlice";

const initialState = {
  status: "idle",
  error: null,
};

export const deleteReferee = (id) => async (dispatch) => {
  dispatch(deleteRefereePending());
  try {
    await axios.delete(`http://localhost:8000/referee/${id}`);
    dispatch(deleteRefereeFulfilled());
    dispatch(fetchReferees());
  } catch (error) {
    dispatch(deleteRefereeRejected(error.message));
  }
};

const deleteRefereeSlice = createSlice({
  name: "deleteReferee",
  initialState,
  reducers: {
    deleteRefereePending: (state) => {
      state.status = "loading";
    },
    deleteRefereeFulfilled: (state) => {
      state.status = "succeeded";
    },
    deleteRefereeRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  deleteRefereePending,
  deleteRefereeFulfilled,
  deleteRefereeRejected,
} = deleteRefereeSlice.actions;

export default deleteRefereeSlice.reducer;