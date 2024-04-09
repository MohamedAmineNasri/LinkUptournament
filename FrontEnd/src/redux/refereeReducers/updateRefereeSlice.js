import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchReferees } from "./fetchRefereeSlice";

const initialState = {
  status: "idle",
  error: null,
};

export const updateReferee = (id, newData) => async (dispatch) => {
  dispatch(updateRefereePending());
  try {
    const response = await axios.patch(`http://localhost:8000/referee/${id}`, newData);
    dispatch(updateRefereeFulfilled(response.data));
    dispatch(fetchReferees());
  } catch (error) {
    dispatch(updateRefereeRejected(error.message));
  }
};

const updateRefereeSlice = createSlice({
  name: "updateReferee",
  initialState,
  reducers: {
    updateRefereePending: (state) => {
      state.status = "loading";
    },
    updateRefereeFulfilled: (state) => {
      state.status = "succeeded";
    },
    updateRefereeRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  updateRefereePending,
  updateRefereeFulfilled,
  updateRefereeRejected,
} = updateRefereeSlice.actions;

export default updateRefereeSlice.reducer;