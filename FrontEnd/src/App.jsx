
import "./App.css";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Matches from "./pages/Matches";
import Players from "./pages/Players";
import Single from "./pages/Single";
import AddAcademy from "./components/AddAcademy";
import AddMatchPopUpWindow from "./components/hamhoum/AddMatchPopUpWindow";
import AddMatch from "./components/hamhoum/anotherAddMatch";
import EditPopUpmatch from "./components/hamhoum/EditPopUpMatch";
import Academy from "./components/Academy";
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
import Group from "./components/Group"
import AddTournament from "./components/AddTournament";
import Tournament from "./components/Tournament";
// import TournamentBracket  from "./components/TournamentBracket";
import MatchCard from "./components/hamhoum/match";
import Fixture from "./components/TestWitheDummyData/matchhhh";
import Table from "./components/TestWitheDummyData/Matchhhhes";
import { data } from "./components/TestWitheDummyData/dummy-data";
import { useEffect , useState } from 'react';
import io from "socket.io-client";

function App() {
  const [fixtures, setFixtures] = useState(data);

  // const [socket, setSocket] = useState(null);
  // const setupSocket = () => {
  //   const token = localStorage.getItem("token");
  //   if (token && !socket) {
  //     const newsocket = io("http://localhost:8000", {
  //       query: {
  //         token: localStorage.getItem("token"),
  //       },
  //     });

  //     newsocket.on("disconnect", () => {
  //       setSocket(null);
  //       setTimeout(setSocket, 3000);
  //       //makeToast("error", "Disconnected !");
  //       console.log("Disconnected")
  //     });
  //     newsocket.on("connect", () => {
  //      // makeToast("success", "Connected !");
  //       console.log("Connected")
  //     });

  //     setSocket(newsocket);
  //   }
  // };

  // useEffect(() => {
  //   setupSocket();
  // }, []); 


  console.log(fixtures);

  // const refresh = () => window.location.reload(true);
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

        {/* <Route element={<RequireAuth allowedRoles={['Manager']} />}> */}
        <Route element={<RequireAuth allowedRoles={['Manager']} />}>
  <Route path="/addAcademy" element={<AddAcademy />} />
  <Route path="/Academy" element={<Academy />} />
</Route>

        <Route path="/tournament" element={<Tournament />} />
        <Route path="/groups" element={<TournamentRoundRobin />} />
        <Route path="/test" element={<TournamentBracket />} />
        <Route path="/player" element={<AddPlayerForm />} />
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
        <Route element={<PersistLogin/>}>
        {/* <Route element={<RequireAuth  />}> */}
            <Route element={<RequireAuth allowedRoles={['Admin','Supporter','Agent','Manager','TournamentCoordinator']} />}>
              <Route path="/welcome" element={<Welcome />} />
              <Route path="/userslist" element={<UserList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/chatroom/:id" element={<ChatroomPage />} />
              <Route path="/userstable" element={<Tables />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

        </Route>
      </Route>
   
        <Route path="/group" element={<Group />} />
        <Route path="/addTournament" element={<AddTournament />} />
        <Route path="/Tournament/:tournamentId" element={<Tournament />} />
        {/* <Route path="/tournamentBracket" element={<TournamentBracket />} /> */}

        {/* </Route> */}
      </Routes>
    
  );
}

export default App;
