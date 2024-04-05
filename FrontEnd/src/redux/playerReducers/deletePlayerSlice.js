import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPlayers } from "./fetchPlayerSlice";

const initialState = {
  status: "idle",
  error: null,
};

export const deletePlayer = (id) => async (dispatch) => {
  dispatch(deletePlayerPending());
  try {
    await axios.delete(`http://localhost:8000/player/${id}`);
    dispatch(deletePlayerFulfilled());
    dispatch(fetchPlayers());
  } catch (error) {
    dispatch(deletePlayerRejected(error.message));
  }
};

const deletePlayerSlice = createSlice({
  name: "deletePlayer",
  initialState,
  reducers: {
    deletePlayerPending: (state) => {
      state.status = "loading";
    },
    deletePlayerFulfilled: (state) => {
      state.status = "succeeded";
    },
    deletePlayerRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  deletePlayerPending,
  deletePlayerFulfilled,
  deletePlayerRejected,
} = deletePlayerSlice.actions;

export default deletePlayerSlice.reducer;