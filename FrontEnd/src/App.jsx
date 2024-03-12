import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import Single from "./pages/Single";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Tournament from "./pages/Tournament";
import LineupBuilder from "./pages/LineupBuilder";
import AddPlayerForm from "./pages/AddPlayerForm";
import TournamentRoundRobin from "./pages/TournamentRoundRobin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/players" element={<Players />} />
        <Route path="/single" element={<Single />} />
        <Route path="/tournament" element={<Tournament />} />
        <Route path="/groups" element={<TournamentRoundRobin />} />
        
        
        <Route path="/player" element={<AddPlayerForm />} />
        <Route path="/lineup-builder" element={<LineupBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
