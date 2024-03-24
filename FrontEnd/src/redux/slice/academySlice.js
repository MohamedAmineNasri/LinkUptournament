import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


//export const fetchAcademy = () => createAsyncThunk
export const fetchAllAcademy = createAsyncThunk(
  'academy/fetchAllAcademy',
  async () => {
    try {
      const response = await axios.get('http://localhost:8000/academy');
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
//next ----> get academy by user id  : http://localhost:8000/academy/getAcademy/USERID
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
//im using it for edit academy pop up to display data in feilds before editing it
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
  async ({ id, name, location, date ,logo,doc,status}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/academy/editAcademy/'+id,
        {
          AcademyName: name, 
          Location: location,
          FoundedYear: date,
          Logo :logo,
          LegitimacyDocuments : doc,
          Status: status  //rejected -----> pending
        }
      );
      
      // window.location.reload();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

// editAcademyStatus for admin -------------------
export const editAcademyStatusToApproved = createAsyncThunk(
  'academy/editAcademyApproved',
  async ({ id}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/academy/updateStatustoApproved/'+id,
       
      );
      
      // window.location.reload();
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
export const editAcademyStatusToRejected = createAsyncThunk(
  'academy/editAcademyRejected',
  async ({ id}) => {
    try {
      const response = await axios.put(
        'http://localhost:8000/academy/updateStatustoRejected/'+id,
      );
      
      // window.location.reload();
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
    allacademies: [],
    academyNameexists : [],
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
    // fetchAcademy
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
      // fetchAcademyById
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
      })
      //fetchAllAcademy
      .addCase(fetchAllAcademy.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllAcademy.fulfilled, (state, action) => {
        state.loading = false;
        state.allacademies = action.payload;
      })
      .addCase(fetchAllAcademy.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
  }
});

export default academySlice.reducer;
