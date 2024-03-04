import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchTeam = createAsyncThunk(
  'match/fetchmatch',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/match');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export default marchSlice.reducer;