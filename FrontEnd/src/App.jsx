import { useState } from "react";

import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import Single from "./pages/Single";
import AddAcademy from "./pages/AddAcademy";
import Academy from "./pages/Academy";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
        <Route path="/addAcademy" element={<AddAcademy />} />
        <Route path="/Academy" element={<Academy />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
