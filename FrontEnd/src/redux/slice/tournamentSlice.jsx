import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


export const addTournament = createAsyncThunk(
  'tournament/addTournament',
  async (tournamentData) => {
    try {
      const response = await axios.post('http://localhost:8000/tournament/add', tournamentData);
      console.log("Server Response:", response); // Log the server response
      return response.data.tournament // Return the entire data from the response
    } catch (error) {
      throw Error(error.response.data);
    }
  }
);

export const fetchtournamentByIdThunk = createAsyncThunk(
  'tournament/',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/tournament/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
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
        state.status = 'loading'; // Update status to loading
        state.error = null;
      })
      .addCase(fetchTournaments.fulfilled, (state, action) => {
        state.status = 'succeeded'; // Update status to succeeded
        state.tournaments = action.payload; // Update tournaments data
      })
      .addCase(fetchTournaments.rejected, (state, action) => {
        state.status = 'failed'; // Update status to failed
        state.error = action.error.message;
      }) .addCase(addTournament.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(addTournament.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tournaments.push(action.payload);
        console.log("Add Tournament Payload:", action.payload); // Add the new tournament to the state
      })
      .addCase(addTournament.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchtournamentByIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchtournamentByIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tournament = action.payload; 
        console.log("tournament Payload:", action.payload);// Assuming the response contains the tournament data
      })
      .addCase(fetchtournamentByIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
  });
  export default tournamentSlice.reducer;