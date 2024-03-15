import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../Features/auth/authSlice';
import rootReducer from '../src/redux/rootReducer'; // Import the rootReducer

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        // root: rootReducer // Include the rootReducer here
    },
    reducer :rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
    // in production it will be turned into false
});

export default store;
