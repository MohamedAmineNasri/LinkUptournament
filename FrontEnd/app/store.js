import { configureStore } from "@reduxjs/toolkit"; 
import { apiSlice } from "./api/apiSlice"; 
import authReducer from '../Features/auth/authSlice'


export const store =  configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer
    },
    middleware: getDefaultMiddleware =>
  getDefaultMiddleware().concat(apiSlice.middleware),

    devTools: true 
    // in production it will be turned into false
})
