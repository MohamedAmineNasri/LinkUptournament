import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPlayersFulfilled } from "./fetchPlayerSlice";

const initialState = {
  status: "idle",
  searchResults: [],
  error: null,
  position: "",
  team: "",
};

export const searchPlayers =
  ({ name, position, team, page, limit }) =>
  async (dispatch) => {
    dispatch(searchPlayersPending());
    try {
      let url = "http://localhost:8000/player/search?";
      if (name) url += `name=${name}&`;
      if (position) url += `position=${position}&`;
      if (page) url += `page=${page}&`;
      if (limit) url += `limit=${limit}&`;
      if (team) url += `team=${team}&`;
      console.log("slice", team);
      const response = await axios.get(url);
      dispatch(
        searchPlayersFulfilled({
          ...response.data,
          type: "search",
          name,
          position,
          team,
        })
      );
      dispatch(
        searchPlayersFulfilled({
          ...response.data,
          type: "search",
          name,
          position,
          team,
        })
      );
      dispatch(
        fetchPlayersFulfilled({
          ...response.data,
          type: "search",
          name,
          position,
          team
        })
      );
    } catch (error) {
      dispatch(searchPlayersRejected(error.message));
    }
  };
const searchPlayerSlice = createSlice({
  name: "searchPlayers",
  initialState,
  reducers: {
    getPlayersPosition: (state, action) => {
      state.status = "succeeded";
      state.position = action.payload;
    },
    getPlayersTeam: (state, action) => {
      state.status = "succeeded";
      state.team = action.payload;
    },
    searchPlayersPending: (state) => {
      state.status = "loading";
    },
    searchPlayersFulfilled: (state, action) => {
      state.status = "succeeded";
      state.searchResults = action.payload;
    },
    searchPlayersRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  getPlayersPosition,
  getPlayersTeam,
  searchPlayersPending,
  searchPlayersFulfilled,
  searchPlayersRejected,
} = searchPlayerSlice.actions;

export default searchPlayerSlice.reducer;
