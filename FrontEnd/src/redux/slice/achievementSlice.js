import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAchievements = createAsyncThunk(
  'achievement/fetchAchievements', 
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/achievement/');
      return response.data;
    } catch (error) {
      throw Error('Error fetching achievements: ' + error.message);
    }
  }
);


export const fetchAchievementById = createAsyncThunk(
  'achievement/fetchAchievementsId', 
  async ({Id}) => {
    try {
      const response = await axios.get('http://localhost:8000/achievement/getAchievementByID/'+Id);
      return response.data;
    } catch (error) {
      throw Error('Error fetching achievement: ' + error.message);
    }
  }
);


export const deleteAchievement = createAsyncThunk(
  'achievement/deleteachievement',
  async ({id}) => {
    try {
      const response = await axios.delete('http://localhost:8000/achievement/deleteAchievement/'+id);
      return response.data;
    } catch (error) {
      throw Error('Error delete teams: ' + error.message);
    }
  }
);


export const addAchivementAndAssaignToAllTeams = createAsyncThunk(
  'achievement/addachievement',
  async ({name, desc,icon,type,ms,reward }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/achievement/addAchievement',
        {
          Name: name, 
          Description: desc,
          Icon: icon,
          Type: type,
          MileStone: ms,
          Reward: reward
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

export const updateAchievement = createAsyncThunk(
  'achievement/editachievement',
  async ({id,name, desc,icon,type,ms,reward,status }) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/achievement/updateAchievement/'+id,
        {
            Name: name, 
            Description: desc,
            Icon: icon,
            Type: type,
            MileStone: ms,
            Reward: reward,
            Status:status
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


const achievementSlice = createSlice({
  name: 'achievement',
  initialState: {
    AchievementData: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAchievements.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAchievements.fulfilled, (state, action) => {
        state.loading = false;
        state.AchievementData = action.payload;
      })
      .addCase(fetchAchievements.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })  
      .addCase(fetchAchievementById.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchAchievementById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.AchievementData = action.payload;
      })
      .addCase(fetchAchievementById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
});

export default achievementSlice.reducer;
