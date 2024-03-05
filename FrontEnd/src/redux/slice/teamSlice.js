import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeam = createAsyncThunk(
  'team/fetchTeam',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/Team');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const deleteTeam = createAsyncThunk(
  'team/deleteTeam',
  async (teamid) => {
    try {
      console.log(teamid)
      const response = await axios.delete('http://localhost:8000/team/deleteTeamByIdandFromAcademy/'+teamid);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const addTeam = createAsyncThunk(
  'team/addTeam',
  async ({ name, logo }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/team/addTeamAndAssaignAcademy',
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

const teamSlice = createSlice({
  name: 'team',
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
