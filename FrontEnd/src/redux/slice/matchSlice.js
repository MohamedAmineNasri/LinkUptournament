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
export const fetchMatchByTournementId = createAsyncThunk(
  'match/fetchMatchByTournementId',
  async (matchid) => {
    try {
      const response = await axios.get(`http://localhost:8000/match/tournement/${matchid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchAllTour = createAsyncThunk(
  'match/fetchallTournementId',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/match/');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const fetchMatchById = createAsyncThunk(
  'match/fetchMatch',
  async (matchid) => {
    try {
      const response = await axios.get(`http://localhost:8000/match/${matchid}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const editMatch = createAsyncThunk(
  'match/editMatch',
  async ({goal2,goal1,matchid,team1Gols,team2Gols,referee,date,tournamentName,startingtime,matchtype,location,logo,matchstatus,tournementId,weathercondition,team1,team2}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/match/'+matchid,
        {goal1:goal1,
          goal2:goal2,
           referee:referee,
          date:date,
          tournamentName:tournamentName,
          startingtime:startingtime,
          matchtype:matchtype,
          location:location,
          logo:logo,
          matchstatus:matchstatus,
          team2Gols:team2Gols,
          team1Gols:team1Gols,
          weathercondition:weathercondition,
          team1:team1,
           team2:team2,
   tournementId:tournementId,

          
        }
      );
      window.location.reload();
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
export const deletetour = createAsyncThunk(
  'match/deleteMatch',
  async (matchid) => {
    try {
      console.log(matchid)
      const response = await axios.delete('http://localhost:8000/tournament/'+matchid);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const addnewMatch = createAsyncThunk(
  'match/addMatch',
  async ({matchTime,team1Gols,team2Gols,referee,date,tournamentName,startingtime,matchtype,location,logo,matchstatus,tournementId,weathercondition,team1,team2}) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/match/',
        {
          // matchTime:matchTime,
          referee:referee,
          date:date,
          tournamentName:tournamentName,
          startingtime:startingtime,
          matchtype:matchtype,
          location:location,
          logo:logo,
          matchstatus:matchstatus,
          team2Gols:team2Gols,
          team1Gols:team1Gols,
          weathercondition:weathercondition,
          team1:team1,
           team2:team2,
   tournementId:tournementId,
          
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
    matchData: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMatch.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMatch.fulfilled, (state, action) => {
        state.loading = false;
        state.matchData = action.payload;
      })
      .addCase(fetchMatch.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default matchSlice.reducer;