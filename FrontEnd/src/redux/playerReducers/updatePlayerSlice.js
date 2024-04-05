import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { fetchPlayers } from "./fetchPlayerSlice";

const initialState = {
  status: "idle",
  error: null,
};

export const updatePlayer = (id, newData) => async (dispatch) => {
  dispatch(updatePlayerPending());
  try {
    const response = await axios.patch(`http://localhost:8000/player/${id}`, newData);
    dispatch(updatePlayerFulfilled(response.data));
    dispatch(fetchPlayers());
  } catch (error) {
    dispatch(updatePlayerRejected(error.message));
  }
  
};

const updatePlayerSlice = createSlice({
  name: "updatePlayer",
  initialState,
  reducers: {
    updatePlayerPending: (state) => {
      state.status = "loading";
    },
    updatePlayerFulfilled: (state) => {
      state.status = "succeeded";
    },
    updatePlayerRejected: (state, action) => {
      state.status = "failed";
      state.error = action.payload;
    },
  },
});

export const {
  updatePlayerPending,
  updatePlayerFulfilled,
  updatePlayerRejected,
} = updatePlayerSlice.actions;

export default updatePlayerSlice.reducer;





