import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchteams = createAsyncThunk(
  'team/fetchTeams', // Corrected action name
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/Team/');
      return response.data;
    } catch (error) {
      throw Error('Error fetching teams: ' + error.message);
    }
  }
);
export const fetchTeamsByName = createAsyncThunk(
  'team/fetchTeamsByName',
  async (searchString) => {
    try {
      const response = await axios.get(`http://localhost:8000/team/teams/search/${searchString}`);
      return response.data;
    } catch (error) {
      throw new Error('Error fetching teams by name: ' + error.message);
    }
  }
);

export const fetchteamById = createAsyncThunk(
  'team/fetchTeamById', 
  async ({teamId}) => {
    try {
      const response = await axios.get('http://localhost:8000/Team/getTeam/'+teamId);
      return response.data;
    } catch (error) {
      throw Error('Error fetching teams: ' + error.message);
    }
  }
);

export const fetchTeamOfAcademy = createAsyncThunk(
  'team/fetchTeam',
  async (idAcademy) => {
    try {
      const response = await axios.get('http://localhost:8000/Team/getTeambyAcademyId/'+idAcademy);
      return response.data;
    } catch (error) {
      throw Error('Error fetching teams: ' + error.message);
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
      throw Error('Error delete teams: ' + error.message);
    }
  }
);
export const deletePlayerFromTeam  = createAsyncThunk(
  'team/deletePlayer',
  async ({it,ip}) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/team/removePlayerFromTeam/${it}/${ip}`
      );
      console.log(it,ip)
      return response.data;
    } catch (error) {
      throw Error('Error removing player from team: ' + error.message);
    }
  }
);



export const addTeamAndAssaignToAcademy = createAsyncThunk(
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
      //we refresh only when team is created sucessfully
      if (response.data === true){
        window.location.reload();
      }
      return response.data;
    } catch (error) {
      throw Error('Error add teams: ' + error.message);
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
      //we refresh only when team is created sucessfully
      if (response.data === true){
        window.location.reload();
      }
      return response.data;
    } catch (error) {
      throw Error('Error edit teams: ' + error.message);
    }
  }
);
export const editTeamSameName = createAsyncThunk(
  'team/editTeamSameName',
  async ({ teamid, name, logo}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/team/updateTeamSameName/'+teamid,
        {
          TeamName: name, 
          TeamLogo: logo,
        }
      );
        window.location.reload();
      return response.data;
    } catch (error) {
      throw Error('Error edit teams: ' + error.message);
    }
  }
);

export const UpdateTeamsStatsFromFinishedMatches =  createAsyncThunk(
  'team/UpdateTeamsStatsFromFinishedMatches', 
  async () => {
    try {
      const response = await axios.post('http://localhost:8000/Team/UpdateTeamsStatsFromFinishedMatches');
      return response.data;
    } catch (error) {
      throw Error('Error fetching teams: ' + error.message);
    }
  }
);

// ena miaoui i added this for testing dw , hani 9otlk mesh kif barsha ness ---------------------------
export const fetchplayerByTeamId =  createAsyncThunk(
  'team/fetchplayerByTeamId', 
  async ({teamId}) => {
    try {
      const response = await axios.get('http://localhost:8000/team/ofTeam/'+teamId);
      return response.data;
    } catch (error) {
      throw Error('Error fetching teams: ' + error.message);
    }
  }
);
// ------------------------------------------------------------------------------------------------------

const teamSlice = createSlice({
  name: 'team',
  initialState: {
    teamData: [],
    allteamData: [],
    SelectedteamDataById: [],
    players :[],
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
      })  
      .addCase(fetchteams.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchteams.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allteamData = action.payload;
      })
      .addCase(fetchteams.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchteamById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchteamById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.SelectedteamDataById = action.payload;
      })
      .addCase(fetchteamById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchplayerByTeamId.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchplayerByTeamId.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.players = action.payload;
      })
      .addCase(fetchplayerByTeamId.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTeamsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTeamsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.teamData = action.payload;
      })
      .addCase(fetchTeamsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default teamSlice.reducer;
