import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import Single from "./pages/Single";
import AddAcademy from "./components/AddAcademy";
import Academy from "./components/Academy";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tournament from "./pages/Tournament";
import LineupBuilder from "./pages/LineupBuilder";
import AddPlayerForm from "./pages/AddPlayerForm";
import TournamentRoundRobin from "./pages/TournamentRoundRobin";
import TournamentBracket from "./pages/TournamentBracket";

import Layout from "./pages/Layout";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/Authentication Pages/SignIn";
import Register from "./pages/Authentication Pages/SignUp";
import Tables from "./pages/User Tables/Tables";
import Profile from "./pages/Profile Pages/Profile";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import UserList from "../Features/users/UserList";
import AdminDashboard from "./Dashboard/AdminDashboard";
import Settings from "./Dashboard/src/pages/Settings";

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

        <Route path="/addAcademy" element={<AddAcademy />} />
        <Route path="/Academy" element={<Academy />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/groups" element={<TournamentRoundRobin />} />
        <Route path="/test" element={<TournamentBracket />} />
        
        
        <Route path="/player" element={<AddPlayerForm />} />
        <Route path="/lineup-builder" element={<LineupBuilder />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />

        <Route path="/dashboardAdmin/*" element={<AdminDashboard />} />
        {/* Protected Routes  */}
        <Route element={<PersistLogin />}>
          {/* <Route element={<RequireAuth  />}> */}
          <Route element={<RequireAuth allowedRoles={["Admin"]} />}>
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/userslist" element={<UserList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/userstable" element={<Tables />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>
    </Routes>
);
}

export default App;
