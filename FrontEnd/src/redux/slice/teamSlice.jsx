import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchteams = createAsyncThunk(
  'team/fetchTeams', // Corrected action name
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/team/');
      return response.data;
    } catch (error) {
      throw Error('Error fetching teams: ' + error.message);
    }
  }
);

export const fetchTeamById = async (id) => {
  const response = await axios.get(`http://localhost:8000/team/getTeam/${id}`);
  return response.data;
};

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teams: [], // Initial teams array
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchteams.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchteams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.teams = action.payload;
      })
      .addCase(fetchteams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default teamSlice.reducer;
