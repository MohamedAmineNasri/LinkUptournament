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
  async ({ matchid,date, time,type}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/match/65f0d356a8f4ca5c1c9d31ec',
        {
          Date: date, 
          startingTime: time,
          matchType:type,
          
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


export const addnewMatch = createAsyncThunk(
  'match/addMatch',
  async ({  time,type,location}) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/match/',
        {
          
          startingTime: time,
          matchType:type,
          location:location
          

          
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