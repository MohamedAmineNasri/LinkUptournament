import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

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
            <GoogleOAuthProvider clientId="416699013224-tu4jfgr86qonamkdcln6khbtt2h125j8.apps.googleusercontent.com">
              <App />
            </GoogleOAuthProvider>

        </BrowserRouter>
      </AuthProvider>
      {/* </Routes> */}
    </Provider>
    
  </React.StrictMode>,
)
