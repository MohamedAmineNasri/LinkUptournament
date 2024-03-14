import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "../src/redux/store.js";

<<<<<<< HEAD
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
=======
import { store } from '../app/store.js' 
import { Provider } from 'react-redux' 
import { BrowserRouter} from "react-router-dom";
import { AuthProvider } from './context/AuthProvider.jsx'

import { GoogleOAuthProvider } from '@react-oauth/google';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Routes> */}
      <AuthProvider>
        <BrowserRouter>
            {/* <Route path="/*" element={<App />}/> */}
            <GoogleOAuthProvider clientId="715046754186-6g6u5s25tsrkmqa229lgdb9tvecmtecd.apps.googleusercontent.com">
              <App />
            </GoogleOAuthProvider>

        </BrowserRouter>
      </AuthProvider>
      {/* </Routes> */}
    </Provider>
    
  </React.StrictMode>,
)
>>>>>>> ee6edd1077311b46c19fc873f0e321e7dc5b70a9
