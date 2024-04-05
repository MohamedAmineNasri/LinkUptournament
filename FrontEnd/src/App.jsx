import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import Single from "./pages/Single";
import AddAcademy from "./components/miaoui/AddAcademy";
import AddMatchPopUpWindow from "./components/hamhoum/AddMatchPopUpWindow";
import AddMatch from "./components/hamhoum/anotherAddMatch";
import EditPopUpmatch from "./components/hamhoum/EditPopUpMatch";
import Academy from "./components/miaoui/Academy";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";

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
import Chat from "./pages/Chat/Chat";
import ChatroomPage from "./pages/Chat/ChatroomPage";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import UserList from "../Features/users/UserList";
import AdminDashboard from "./Dashboard/AdminDashboard";
import Settings from "./Dashboard/src/pages/Settings";
import Tournament from "./pages/TournamentManagementPages/Tournament";
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

// import TournamentBracket  from "./components/TournamentBracket";

import MatchCard from "./components/hamhoum/match";
import Fixture from "./components/TestWitheDummyData/matchhhh";
import Table from "./components/TestWitheDummyData/Matchhhhes";
import { data } from "./components/TestWitheDummyData/dummy-data";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import VideoPodcast from "./pages/Podcast/VideoPodcast";
import ViewerLiveStream from "./pages/LiveStream/ViewerLiveStream";
import VideoLiveStream from "./pages/LiveStream/VideoLiveStream";
import CheckSelectedTeam from "./components/miaoui/CheckSelectedTeam";

function App() {
  const [fixtures, setFixtures] = useState(data);

  console.log(fixtures);

  // const refresh = () => window.location.reload(true);
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes  */}
        <Route index element={<Home />} />
          {/**YASSINE_ROUTES*/}
      {/* <Route path="/page" element={<LandingPage />} /> */}
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
     
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/matches" element={<Matches />} />
        <Route path="/players" element={<Players />} />
        <Route path="/single" element={<Single />} />

        <Route element={<RequireAuth allowedRoles={["Manager"]} />}>
          {/* <Route path="/addAcademy" element={<AddAcademy />} /> */}
        </Route>
        <Route path="/addAcademy" element={<AddAcademy />} />
        <Route path="/Academy" element={<Academy />} />
        <Route path="/team/:idTeam" element={<CheckSelectedTeam />} />
        {/* <Route element={<RequireAuth allowedRoles={['Manager']} />}> */}
        <Route element={<RequireAuth allowedRoles={["Manager"]} />}>
          <Route path="/addAcademy" element={<AddAcademy />} />
          <Route path="/Academy" element={<Academy />} />
        </Route>

        <Route path="/Academy" element={<Academy />} />
        <Route path="/tournement" element={<Tournament />} />
        <Route path="/groups" element={<TournamentRoundRobin />} />
        <Route path="/test" element={<TournamentBracket />} />
        <Route path="/player/:idTeam" element={<AddPlayerForm />} />
        <Route path="/lineup-builder" element={<LineupBuilder />} />
        <Route path="/t" element={<EditPopUpmatch />} />
        <Route path="/match" element={<MatchCard />} />
        <Route path="/a" element={<Table data={fixtures} />}></Route>
        <Route
          path="/fixture/:matchID"
          element={<Fixture data={fixtures} />}
        ></Route>
        <Route path="/testtt" element={<AddMatchPopUpWindow />} />
        <Route path="/testt" element={<AddMatch />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboardAdmin/*" element={<AdminDashboard />} />
        {/* Protected Routes  */}
        <Route element={<PersistLogin />}>
          {/* <Route element={<RequireAuth  />}> */}
          <Route
            element={
              <RequireAuth
                allowedRoles={[
                  "Admin",
                  "Supporter",
                  "Agent",
                  "Manager",
                  "TournamentCoordinator",
                ]}
              />
            }
          >
            <Route path="/welcome" element={<Welcome />} />
            <Route path="/userslist" element={<UserList />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/videopodcast" element={<VideoPodcast />} />
            <Route path="/viewerlivestream" element={<ViewerLiveStream />} />
            <Route path="/videolivestream" element={<VideoLiveStream />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/chatroom/:id" element={<ChatroomPage />} />
            <Route path="/userstable" element={<Tables />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Route>

     
      {/* <Route path="/tournamentBracket" element={<TournamentBracket />} /> */}

      {/* </Route> */}
    </Routes>
  );
}

export default App;
