import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchRefereesFulfilled } from "./fetchRefereeSlice";

const initialState = {
  status: "idle",
  searchResults: [],
  error: null,
  queryReferee: {
    name: null,
    availability: null,
    role: null,
  },
};

export const searchReferees =
  ({ name, role, availability }) =>
  async (dispatch) => {
    dispatch(searchRefereesPending());
    try {
      let url = "http://localhost:8000/referee/search?";
      if (name) url += `name=${name}&`;
      if (role) url += `role=${role}&`;
      if (availability) url += `availability=${availability}&`;

      const response = await axios.get(url);
      
      dispatch(searchRefereesFulfilled(response.data));
      dispatch(fetchRefereesFulfilled(response.data));
    } catch (error) {
      dispatch(searchRefereesRejected(error.message));
    }
  };

const searchRefereesSlice = createSlice({
  name: "searchReferees",
  initialState,
  reducers: {
    getRefereesQueryData: (state, action) => {
      state.status = "succeeded";
      state.queryReferee = action.payload;
    },
    searchRefereesPending: (state) => {
      state.status = "loading";
    },
    searchRefereesFulfilled: (state, action) => {
      state.status = "succeeded";
      state.searchResults = action.payload;
    },
    searchRefereesRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  searchRefereesFulfilled,
  searchRefereesPending,
  searchRefereesRejected,
  getRefereesQueryData,
} = searchRefereesSlice.actions;

export default searchRefereesSlice.reducer;
