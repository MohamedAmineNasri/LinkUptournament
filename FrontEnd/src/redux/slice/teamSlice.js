import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeamOfAcademy = createAsyncThunk(
  'team/fetchTeam',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/Team/getTeambyAcademyId/65d63d731ae37b6822a03daa');
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
  async ({idAcademy, name, logo }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/team/addTeamAndAssaignAcademy',
        {
          TeamName: name, 
          TeamLogo: logo,
          academy: idAcademy
        }
      );
      window.location.reload();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const editTeam = createAsyncThunk(
  'team/editTeam',
  async ({ teamid, name, logo}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/team/updateTeam/'+teamid,
        {
          TeamName: name, 
          TeamLogo: logo,
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
      .addCase(fetchTeamOfAcademy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamOfAcademy.fulfilled, (state, action) => {
        state.loading = false;
        state.teamData = action.payload;
      })
      .addCase(fetchTeamOfAcademy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default teamSlice.reducer;
