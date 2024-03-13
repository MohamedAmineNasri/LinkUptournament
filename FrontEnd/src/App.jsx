
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import Single from "./pages/Single";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Group from "./components/Group"
import AddTournament from "./components/AddTournament";
// import TournamentBracket  from "./components/TournamentBracket";

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
        <Route path="/group" element={<Group />} />
        <Route path="/addTournament" element={<AddTournament />} />
        {/* <Route path="/tournamentBracket" element={<TournamentBracket />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
