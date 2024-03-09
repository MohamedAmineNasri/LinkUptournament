import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchMatch = createAsyncThunk(
  'match/fetchMatch',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/match');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const deleteMatch = createAsyncThunk(
  'match/deleteMatch',
  async (matchid) => {
    try {
      console.log(matchid)
      const response = await axios.delete('http://localhost:8000/match/'+matchid);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const addMatch = createAsyncThunk(
  'match/addMatch',
  async ({ name, logo }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/match/',
        {
          TeamName: name, 
          TeamLogo: logo,
          academy: "65d63da21ae37b6822a03dac"
        }
      );
      window.location.reload();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const matchSlice = createSlice({
  name: 'match',
  initialState: {
    teamData: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTeam.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeam.fulfilled, (state, action) => {
        state.loading = false;
        state.teamData = action.payload;
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default teamSlice.reducer;