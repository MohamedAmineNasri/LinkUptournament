import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: "idle",
  players: [],
  error: null,
};

export const fetchPlayers = () => async (dispatch) => {
  dispatch(fetchPlayersPending());
  try {
    const response = await axios.get("http://localhost:8000/player");
    dispatch(fetchPlayersFulfilled(response.data));
  } catch (error) {
    dispatch(fetchPlayersRejected(error.message));
  }
};

const fetchPlayerSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    fetchPlayersPending: (state) => {
      state.status = "loading";
    },
    fetchPlayersFulfilled: (state, action) => {
      state.status = "succeeded";
      state.players = action.payload;
    },
    fetchPlayersRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  fetchPlayersPending,
  fetchPlayersFulfilled,
  fetchPlayersRejected,
} = fetchPlayerSlice.actions;

export default fetchPlayerSlice.reducer;
