import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// export const fetchAchievements = createAsyncThunk(
//   'achievement/fetchAchievements', 
//   async () => {
//     try {
//       const response = await axios.get('http://localhost:8000/achievement/');
//       return response.data;
//     } catch (error) {
//       throw Error('Error fetching achievements: ' + error.message);
//     }
//   }
// );
export const fetchTAchievementByTeamId = createAsyncThunk(
  'tachievement/fetchtAchievementsTeamId', 
  async ({idTeam}) => {
    try {
      const response = await axios.get('http://localhost:8000/tachievement/teamAchievs/'+idTeam);
      return response.data;
    } catch (error) {
      throw Error('Error fetching achievement: ' + error.message);
    }
  }
);
export const fetchDefaultAchievementOfTeamByTeamId = createAsyncThunk(
  'tachievement/fetchDefaultAchievementOfTeamByTeamId', 
  async ({idTeam}) => {
    try {
      const response = await axios.get('http://localhost:8000/tachievement/DefaultteamAchievs/'+idTeam);
      //we have 2 data list types
      return {
        Active: response.data.Active,
        NonActive: response.data.NonActive
      };
    } catch (error) {
      throw Error('Error fetching achievement: ' + error.message);
    }
  }
);



// export const deleteAchievement = createAsyncThunk(
//   'achievement/deleteachievement',
//   async (id) => {
//     try {
//       console.log(teamid)
//       const response = await axios.delete('http://localhost:8000/achievement/deleteAchievement/'+id);
//       return response.data;
//     } catch (error) {
//       throw Error('Error delete teams: ' + error.message);
//     }
//   }
// );


// export const addAchivementAndAssaignToAllTeams = createAsyncThunk(
//   'achievement/addachievement',
//   async ({name, desc,icon,type,ms,reward }) => {
//     try {
//       const response = await axios.post(
//         'http://localhost:8000/achievement/addAchivementAndAssaignToAllTeams',
//         {
//           Name: name, 
//           Description: desc,
//           Icon: icon,
//           Type: type,
//           MileStone: ms,
//           Reward: reward
//         }
//       );
//       //we refresh only when team is created sucessfully
//       if (response.data === true){
//         window.location.reload();
//       }
//       return response.data;
//     } catch (error) {
//       throw Error('Error add teams: ' + error.message);
//     }
//   }
// );

export const updatetachievementStatus = createAsyncThunk(
  'tachievement/editTachievement',
  async ({idTeam}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/tachievement/updateTeamAchievementStatus/'+idTeam,
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


const tachievementSlice = createSlice({
  name: 'tachievement',
  initialState: {
    ActiveAchievementData: [],
    NonActiveAchievementData: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDefaultAchievementOfTeamByTeamId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDefaultAchievementOfTeamByTeamId.fulfilled, (state, action) => {
        state.loading = false;
        state.ActiveAchievementData = action.payload.Active;
        state.NonActiveAchievementData = action.payload.NonActive;
      })
      .addCase(fetchDefaultAchievementOfTeamByTeamId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })  
      
  }
});

export default tachievementSlice.reducer;
