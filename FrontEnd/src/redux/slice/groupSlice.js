import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for creating groups

export const createGroupsThunk = createAsyncThunk(
  'groups/create',
  async (arg, thunkAPI) => {
    const { id, nbG, nbT } = arg;
    console.log(id , nbG , nbT );
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("in groupslice")
      const response = await axios.post(`http://localhost:8000/group/addGroupsStage/${id}/${nbG}/${nbT}`);
      return response.data;
    } catch (error) {
      if (error && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        // Handle unexpected errors
        console.error(error);
        return rejectWithValue('Unexpected error');
      }
    }
  }
);


export const fetchGroupsByTournamentIdThunk = createAsyncThunk(
    'groups/fetchByTournamentId',
    async (id, { rejectWithValue }) => {
      try {
        const response = await axios.get(`http://localhost:8000/group/tournament/${id}`);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

// Async thunk for getting a group by ID
export const fetchGroupByIdThunk = createAsyncThunk(
  'groups/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://localhost:8000/group/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Slice for groups
const groupSlice = createSlice({
  name: 'group',
  initialState: {
    groups: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(fetchGroupByIdThunk.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchGroupByIdThunk.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.group = action.payload; 
      console.log("Add groups Payload:", action.payload);// Assuming the response contains the group data
    })
    .addCase(fetchGroupByIdThunk.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.payload ? action.payload.message : action.error.message;
    })
      .addCase(createGroupsThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createGroupsThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload.groups; // Assuming the response has a 'groups' field
      })
      .addCase(createGroupsThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      }).addCase(fetchGroupsByTournamentIdThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchGroupsByTournamentIdThunk.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.groups = action.payload; // Assuming the response contains an array of groups
      })
      .addCase(fetchGroupsByTournamentIdThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload ? action.payload.message : action.error.message;
      });
  },
});

export default groupSlice.reducer;
