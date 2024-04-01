import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import storeN2 from "../src/redux/store.js";
import { Provider } from "react-redux";
import { store } from "../app/store.js" ; 
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ContextProvider } from "./pages/Podcast/SocketContext.jsx";

// import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <Routes> */}
      <AuthProvider>
        <BrowserRouter>
          {/* <Route path="/*" element={<App />}/> */}
          <ContextProvider>
            <App />
          </ContextProvider>   
        </BrowserRouter>
      </AuthProvider>
      {/* </Routes> */}
    </Provider>
  </React.StrictMode>
);
