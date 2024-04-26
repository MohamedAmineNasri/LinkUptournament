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
      console.log(tournamentData)
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

  export const sendSMSToPlayer = createAsyncThunk(
    'tournament/sendSMSToPlayer',
    async ({ tournamentId, playerId }) => {
      try {
        const response = await axios.post(`http://localhost:8000/tournament/sendSMS/${tournamentId}/${playerId}`);
        return response.data;
      } catch (error) {
        throw Error(error.response.data);
      }
    }
  );
  export const fetchTournamentsByName = createAsyncThunk(
    'tournament/fetchTournamentsByName',
    async (searchString) => {
      try {
        const response = await axios.get(`http://localhost:8000/tournament/search/${searchString}`);
        return response.data;
      } catch (error) {
        throw new Error('Error fetching tournaments by name: ' + error.message);
      }
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
      })
      // Delete Tournament
      .addCase(deleteTournament.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(deleteTournament.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tournaments = state.tournaments.filter(tournament => tournament.id !== action.payload);
      })
      .addCase(deleteTournament.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      // Update Tournament
      .addCase(updateTournament.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(updateTournament.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const index = state.tournaments.findIndex(tournament => tournament.id === action.payload.id);
        if (index !== -1) {
          state.tournaments[index] = action.payload;
        }
      })
      .addCase(updateTournament.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(sendSMSToPlayer.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(sendSMSToPlayer.fulfilled, (state, action) => {
        state.status = 'succeeded';
        console.log('SMS sent successfully:', action.payload);
      })
      .addCase(sendSMSToPlayer.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchTournamentsByName.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTournamentsByName.fulfilled, (state, action) => {
        state.loading = false;
        state.tournamentData = action.payload;
      })
      .addCase(fetchTournamentsByName.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
  });
  export default tournamentSlice.reducer;