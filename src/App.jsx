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
import { Route, Routes } from "react-router-dom";
import Tournament from "./pages/TournamentManagementPages/Tournament";
import LineupBuilder from "./pages/LineupBuilder";
import AddPlayerForm from "./pages/AddPlayerForm";
import TournamentRoundRobin from "./pages/TournamentRoundRobin";
import TournamentBracket from "./pages/TournamentBracket";
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
import Fixture from "./components/TestWitheDummyData/matchhhh";
import { data } from "./components/TestWitheDummyData/dummy-data";
import LandingPage from "./pages/LandingPage Pages/LandingPage";
import TournamentLayout from "./pages/TournamentManagementPages/TournamentLayout";
import ManageTournament from "./pages/TournamentManagementPages/ManageTournament";
import ManageParticipant from "./pages/TournamentManagementPages/ManageParticipant";
import ManagePlayer from "./components/TournamentManagementComponenets/ManagePlayer";
import ManageTeam from "./components/TournamentManagementComponenets/ManageTeam";
import ManageReferees from "./components/TournamentManagementComponenets/ManageReferees";
import ConsultTeam from "./components/TournamentManagementComponenets/ConsultTeam";
import ConsultPlayer from "./components/TournamentManagementComponenets/ConsultPlayer";
import ConsultReferee from "./components/TournamentManagementComponenets/ConsultReferee";
import ManageTournamentFormat from "./components/TournamentManagementComponenets/ManageTournamentFormat";
import ManageTournamentGroup from "./components/TournamentManagementComponenets/ManageTournamentGroup";
import FormatSelect from "./components/TournamentManagementComponenets/FormatSelect";
import EditTournament from "./components/TournamentManagementComponenets/EditTournament";
import AddTournament from "./pages/TournamentManagementPages/ManageTournament1";

function App() {
  const [fixtures, setFixtures] = useState(data);

  console.log(fixtures);

  const refresh = () => window.location.reload(true);
  return (
    <Routes>
      {/* Public Routes  */}
      <Route index element={<Home />} />
      {/**YASSINE_ROUTES*/}
      <Route path="/page" element={<LandingPage />} />
      <Route path="/manage" element={<TournamentLayout />}>
        
        <Route index element={<ManageTournament />} />
        <Route path="edit/:tournamentId" element={<EditTournament />} />
        <Route path="tournament/:tournamentId" element={<Tournament/>}/>
        <Route path="addtournament" element={<AddTournament/>}/>
        <Route path="format" element={<FormatSelect />}>
          <Route path="bracket" element={<ManageTournamentFormat />} />
          <Route path="group" element={<ManageTournamentGroup />} />
        </Route>
        <Route path="participant" element={<ManageParticipant />}>
          <Route path="team" element={<ManageTeam />} />
          <Route path="team/consult" element={<ConsultTeam />} />
          <Route path="player" element={<ManagePlayer />} />
          <Route path="player/consult" element={<ConsultPlayer />} />
          <Route path="referee" element={<ManageReferees />} />
          <Route path="referee/consult" element={<ConsultReferee />} />
        </Route>
      </Route>
     
      {/**YASSINE_ROUTES*/}
      <Route path="/contact" element={<Contact />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/matches" element={<Matches />} />
      <Route path="/players" element={<Players />} />
      <Route path="/single" element={<Single />} />
      <Route path="/addAcademy" element={<AddAcademy />} />
      <Route path="/Academy" element={<Academy />} />
      <Route path="/tournament" element={<Tournament />} />
      <Route path="/groups" element={<TournamentRoundRobin />} />
      <Route path="/bracket" element={<TournamentBracket />} />
      <Route path="/player" element={<AddPlayerForm />} />
      <Route path="/lineup-builder" element={<LineupBuilder />} />

      <Route
        path="/fixture/:matchID"
        element={<Fixture data={fixtures} />}
      ></Route>
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
    </Routes>
  );
}

export default App;
