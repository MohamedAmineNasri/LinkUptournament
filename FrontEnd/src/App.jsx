import * as Sentry from "@sentry/react";
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
import { Route, Routes } from "react-router-dom";

import AddPlayerForm from "./pages/AddPlayerForm";
import TournamentRoundRobin from "./pages/TournamentRoundRobin";
import TournamentBracket from "./components/Tournament/TournamentBracket";

import Layout from "./pages/Layout";
import Welcome from "./pages/Welcome";
import SignIn from "./pages/Authentication Pages/SignIn";
import Register from "./pages/Authentication Pages/SignUp";
import Tables from "./pages/User Tables/Tables";
import Profile from "./pages/Profile Pages/Profile";
import Chat from "./pages/Chat/Chat";
import FrontUserChat from "./pages/Chat/FrontUserChat";
import ChatroomPage from "./pages/Chat/ChatroomPage";
import ChatroomFrontPage from "./pages/Chat/ChatroomFrontPage";
import RequireAuth from "./pages/RequireAuth";
import PersistLogin from "./pages/PersistLogin";
import UserList from "../Features/users/UserList";
import AdminDashboard from "./Dashboard/AdminDashboard";
import Settings from "./Dashboard/src/pages/Settings";
import Tournament from "./components/Tournament/Tournament";
import TournamentLayout from "./pages/TournamentManagementPages/TournamentLayout";
import ManageTournament from "./components/Tournament/ManageTournament";
import ManageParticipant from "./pages/TournamentManagementPages/ManageParticipant";
import ManagePlayer from "./components/TournamentManagementComponenets/ManagePlayer";
import ManageReferees from "./components/TournamentManagementComponenets/ManageReferees";
import ConsultPlayer from "./components/TournamentManagementComponenets/ConsultPlayer";
import ConsultReferee from "./components/TournamentManagementComponenets/ConsultReferee";
import ManageTournamentFormat from "./components/TournamentManagementComponenets/ManageTournamentFormat";
import ManageTournamentGroup from "./components/TournamentManagementComponenets/ManageTournamentGroup";
import FormatSelect from "./components/Tournament/FormatSelect";
import Pdf from "./components/hamhoum/justpdf";
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
import Panel from "./components/hamhoum/panel";
import Fetchonematch from "./components/hamhoum/fetchOneMatchByID";
import Fetchalltour from "./components/hamhoum/getAllGroup";
import Fetchmatchbytour from "./components/hamhoum/fetchmatchesByTournementId";
import Buy from "./components/hamhoum/buyticket";
import Fetchmatchforview from "./components/hamhoum/fetchmatchesforvuews";
import AddTour from "./components/Tournament/AddTournament";
import Edit from "./components/Tournament/Edit";

import Payment from "./components/hamhoum/Payments";
import Completiont from "./components/hamhoum/Completion";
import { loadStripe } from "@stripe/stripe-js";
import QrCode from "./components/hamhoum/QrCode";
import Timer from "./components/hamhoum/timer";
import FetchMatchByGroup from "./components/hamhoum/getMatchByGroup";

// import Payment from "./components/hamhoum/Payments";
// import Completiont from "./components/hamhoum/Completion";
// import { Elements, PaymentElement } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";

import TeamLineUp from "./pages/TeamLineUp";
import ViewerLiveStreamUi from "./pages/LiveStream/ViewerLiveStreamUi";
import VideoLiveStreamUi from "./pages/LiveStream/VideoLiveStreamUi";
import HomeLandingPage from "./landingPage/HomeLandingPage";

import AOS from "aos";
import "aos/dist/aos.css";

import Tournaments from "./components/landingpage/Tournaments";

import NotFound from "./landingPage/notfound";
import Tourn from "./components/Tourn/Tourn";
import AddTourn from "./components/Tourn/AddTourn";
import BracketGenerator from "./components/Tourn/BracketGenerator";
import TournamentGroup from "./components/Tourn/TournamentGroup";
import TournamentFrontOffice from "./components/Tourn/TournamentFrontOffice";
import TournamentBracketFrontOffice from "./components/Tourn/TournamentBracketFrontOffice";

function App() {
  // animeaa
  const [fixtures, setFixtures] = useState(data);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    AOS.init({
      duration: 1000, // Change the animation duration as per your preference
    });
    const timeout = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timeout);
  }, []);

  //console.log(fixtures);

  // const refresh = () => window.location.reload(true);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <img
            src="https://cdn.dribbble.com/users/494229/screenshots/1601132/loadingicon14.gif"
            alt="Loading..."
          />
        </div>
      ) : (
        <Routes>
          <Route path="/timer" element={<Timer />} />
          <Route
            path="/matchBygroup/:tournamentId/:group"
            element={<FetchMatchByGroup />}
          />
          <Route path="/qr" element={<QrCode />} />

          <Route path="/c/:id" element={<Completiont />} />
          <Route path="/pdf/:id" element={<Pdf />} />
          <Route path="/buy/" element={<Buy />} />

          <Route path="/panel/:match" element={<Panel />} />
          <Route
            path="/fetchallgroup/:tournamentId"
            element={<Fetchalltour />}
          />
          <Route path="/fetchmatchforview" element={<Fetchmatchforview />} />
          <Route path="/fetchmatchbytour/:id" element={<Fetchmatchbytour />} />
          <Route path="/testtt" element={<AddMatchPopUpWindow />} />
          <Route
            path="/fetchonematch/:tournamentId"
            element={<Fetchonematch />}
          />

          <Route path="/" element={<Layout />}>
            {/* Public Routes  */}
            <Route index element={<HomeLandingPage />} />
            

            <Route path="/ChatFront" element={<FrontUserChat />} />
            <Route path="/tournaments" element={<TournamentFrontOffice />} />
            <Route
              path="/tournament/bracket/:id"
              element={<TournamentBracketFrontOffice />}
            />
            {/**YASSINE_ROUTES*/}
            {/* <Route path="/page" element={<LandingPage />} /> */}
            <Route
              element={<RequireAuth allowedRoles={["Manager", "Admin"]} />}
            >
              <Route path="/manage" element={<TournamentLayout />}>
                <Route index element={<Tourn />} />
                <Route path="shame" element={<ManageTournament />} />
                <Route path="editt/:tournamentId" element={<Edit />} />
                <Route
                  path="tournament/:tournamentId"
                  element={<Tournament />}
                />
                <Route path="addT" element={<AddTour />} />
                <Route path="format" element={<FormatSelect />}>
                  <Route path="bracket" element={<ManageTournamentFormat />} />
                  <Route path="group" element={<ManageTournamentGroup />} />
                </Route>
                <Route path="lineup" element={<TeamLineUp />} />
                {"Updated Part"}
                <Route path="addtourn" element={<AddTourn />} />
                <Route path="bracket/:id" element={<BracketGenerator />} />
                <Route path="group/:id" element={<TournamentGroup />} />
                {"Updated Part"}
                <Route path="participant" element={<ManageParticipant />}>
                  <Route path="player" element={<ManagePlayer />} />
                  <Route path="player/consult" element={<ConsultPlayer />} />
                  <Route path="referee" element={<ManageReferees />} />
                  <Route path="referee/consult" element={<ConsultReferee />} />
                </Route>
              </Route>
            </Route>

            {/**YASSINE_ROUTES*/}

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

            <Route path="/t" element={<EditPopUpmatch />} />
            <Route path="/match" element={<MatchCard />} />
            <Route path="/a" element={<Table data={fixtures} />}></Route>
            <Route
              path="/fixture/:matchID"
              element={<Fixture data={fixtures} />}
            ></Route>
            <Route path="/testtt" element={<AddMatchPopUpWindow />} />
            <Route path="/testt" element={<AddMatch />} />

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
                      "Recruiter"
                    ]}
                  />
                }
              >
                <Route path="/payment/:id" element={<Payment />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/userslist" element={<UserList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/videopodcast" element={<VideoPodcast />} />
                <Route
                  path="/viewerlivestream"
                  element={<ViewerLiveStream />}
                />
                <Route
                  path="/viewerlivestreamui"
                  element={<ViewerLiveStreamUi />}
                />
                <Route path="/videolivestream" element={<VideoLiveStream />} />
                <Route
                  path="/videolivestreamui"
                  element={<VideoLiveStreamUi />}
                />
                <Route path="/chat" element={<Chat />} />
                <Route path="/chatroom/:id" element={<ChatroomPage />} />
                <Route
                  path="/chatroomFront/:id"
                  element={<ChatroomFrontPage />}
                />
                <Route path="/userstable" element={<Tables />} />
                <Route path="/settings" element={<Settings />} />
              </Route>
            </Route>
          </Route>

          {/* <Route path="/tournamentBracket" element={<TournamentBracket />} /> */}

          {/* </Route> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
}

export default Sentry.withProfiler(App);
