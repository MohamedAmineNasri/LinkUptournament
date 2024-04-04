import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from '../Features/auth/authSlice';
import rootReducer from '../src/redux/rootReducer'; // Import the rootReducer

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        root: rootReducer // Combine all reducers under the "root" key
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
});


export default store;