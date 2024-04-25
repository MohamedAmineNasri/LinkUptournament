import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import storeN2 from "../src/redux/store.js";
import { Provider } from "react-redux";
import { store } from "../app/store.js";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider.jsx";
import { ContextProvider } from "./pages/Podcast/SocketContext.jsx";

//...
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://675a463797dc0e1c1afacf4b3eb9abd2@o4507119370108928.ingest.de.sentry.io/4507119372402768",
  integrations: [
    Sentry.metrics.metricsAggregatorIntegration(),
    Sentry.reactRouterV3BrowserTracingIntegration({useEffect: React.useEffect,}),
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration(),
  ],
  tracesSampleRate: 1.0, 
  tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
  replaysSessionSampleRate: 0.1, 
  replaysOnErrorSampleRate: 1.0, 
});



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
