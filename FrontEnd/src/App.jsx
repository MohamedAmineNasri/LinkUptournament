import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import Single from "./pages/Single";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Welcome from "./pages/Welcome";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import UserList from "../Features/users/UserList";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes  */}
        <Route index element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/players" element={<Players />} />
        <Route path="/single" element={<Single />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        {/* Protected Routes  */}
        <Route element={<PersistLogin/>}>
        {/* <Route element={<RequireAuth  />}> */}
            <Route element={<RequireAuth allowedRoles={['Admin']} />}>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/userslist" element={<UserList />} />
            </Route>

        </Route>
        
      </Route>
    </Routes>
  );
}

export default App;