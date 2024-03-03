import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

//export const fetchAcademy = () => createAsyncThunk
export const fetchAcademy = createAsyncThunk(
  'academy/fetchAcademy',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/academy/getAcademy/65d63da21ae37b6822a03dac');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

const academySlice = createSlice({
  name: 'academy',
  initialState: {
    academyData: [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAcademy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademy.fulfilled, (state, action) => {
        state.loading = false;
        state.academyData = action.payload;
      })
      .addCase(fetchAcademy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default academySlice.reducer;
