import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//export const fetchAcademy = () => createAsyncThunk
export const fetchAcademy = createAsyncThunk(
  'academy/fetchAcademy',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/academy/getAcademy/65d63d731ae37b6822a03daa');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchAcademyById = createAsyncThunk(
  'academy/fetchAcademyByid',
  async (Academyid) => {
    try {
      const response = await axios.get('http://localhost:8000/academy/getAcademy/'+Academyid);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const editAcademy = createAsyncThunk(
  'academy/editAcademy',
  async ({ id, name, location, date ,logo,doc}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/academy/editAcademy/'+id,
        {
          AcademyName: name, 
          Location: location,
          FoundedYear: date,
          Logo :logo,
          LegitimacyDocuments : doc
        }
      );
      window.location.reload();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);


export const addnewAcademy = createAsyncThunk(
  'academy/addnewAcademy',
  async ({ name, location,logo,foundedYear,doc }) => {
    try {
      const response = await axios.post(
        'http://localhost:8000/academy/addAcademy',
        {
          AcademyName: name, 
          Location: location,
          Logo: logo,
          FoundedYear:foundedYear,
          LegitimacyDocuments : doc
        }
      );
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
    academyDataById: [],
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
      })
      .addCase(fetchAcademyById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAcademyById.fulfilled, (state, action) => {
        state.loading = false;
        state.academyDataById = action.payload;
      })
      .addCase(fetchAcademyById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default academySlice.reducer;
