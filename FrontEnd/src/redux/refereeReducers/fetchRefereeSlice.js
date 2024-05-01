import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  referees: [],
  error: null,
};

export const fetchReferees =
  (page = 1, limit = 10) =>
  async (dispatch) => {
    dispatch(fetchRefereesPending());
    try {
      const response = await fetch(
        `http://localhost:8000/referee?page=${page}&limit=${limit}`
      );
      const data = await response.json();
      dispatch(fetchRefereesFulfilled(data));
    } catch (error) {
      dispatch(fetchRefereesRejected(error.message));
    }
  };

const fetchRefereeSlice = createSlice({
  name: "referees",
  initialState,
  reducers: {
    fetchRefereesPending: (state) => {
      state.status = "loading";
    },
    fetchRefereesFulfilled: (state, action) => {
      state.status = "succeeded";
      state.referees = action.payload;
    },
    fetchRefereesRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchRefereesPending,
  fetchRefereesFulfilled,
  fetchRefereesRejected,
} = fetchRefereeSlice.actions;

export default fetchRefereeSlice.reducer;
