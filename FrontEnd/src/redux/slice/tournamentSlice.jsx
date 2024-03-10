import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addTournament = createAsyncThunk(
    'tournament/addTournament',
    async (tournamentData) => {
      const response = await axios.post('http://localhost:8000/tournament/add', tournamentData);
      return response.data;
    }
  );

export const deleteTournament = createAsyncThunk(
    'tournament/deleteTournament',
    async (id) => {
      await axios.delete(`http://localhost:8000/tournament/delete/${id}`);
      return id;
    }
  );

export const updateTournament = createAsyncThunk(
    'tournament/updateTournament',
    async ({ id, ...tournamentData }) => {
      const response = await axios.put(`http://localhost:8000/tournament/update/${id}`, tournamentData);
      return response.data;
    }
  );


export const fetchTournaments = createAsyncThunk(
    'tournament/fetchTournaments',
    async () => {
      const response = await axios.get('http://localhost:8000/tournament/all');
      return response.data;
    }
  );


  const tournamentSlice = createSlice({
    name: 'tournament',
    initialState: {
      tournaments: [],
      status: 'idle',
      error: null
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchTournaments.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTournaments.fulfilled, (state, action) => {
          state.loading = false;
          state.teamData = action.payload;
        })
        .addCase(fetchTournaments.rejected, (state, action) => {
          state.loading = false;
          state.error = action.error.message;
        });
    },
  });
  export default tournamentSlice.reducer;