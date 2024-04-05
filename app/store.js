import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "../Features/auth/authSlice";
import rootReducer from "../src/redux/rootReducer"; // Import the rootReducer
import { composeWithDevTools } from "@redux-devtools/extension";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    root: rootReducer, // Combine all reducers under the "root" key
  },
  composeWithDevTools,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
