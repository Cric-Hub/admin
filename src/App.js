import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import ForgotPassword from "./components/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/resetPassword/ResetPassword.jsx";
import List from "./pages/list/List.jsx";
import PlayerList from "./pages/list/PlayerList.jsx";
import ClubList from "./pages/list/ClubList.jsx";
import MatchList from "./pages/list/MatchList.jsx";
import Single from "./pages/single/Single.jsx";
import New from "./pages/systemAdmin/new/New.jsx";
import NewPlayer from "./pages/systemAdmin/newPlayer/NewPlayer.jsx";
import NewPlayerByClub from "./pages/clubAdmin/newPlayerByClub/NewPlayerByClub.jsx";
import NewClub from "./pages/systemAdmin/newClub/NewClub.jsx";
import NewMatch from "./pages/systemAdmin/newMatch/NewMatch.jsx";
import NewMatchByClub from "./pages/clubAdmin/newMatchByClub/NewMatchByClub.jsx";
import NewNews from "./pages/systemAdmin/newNews/NewNews.jsx";
import UpdateMatch from "./pages/updateMatch/UpdateMatch.jsx";
import ViewUsers from "./pages/viewUsers/ViewUsers.jsx";
import ProfileUpdateNew from "./components/profileUpdate/ProfileUpdateNew.jsx";
import Settings from "./pages/settings/Settings.jsx";
import Profile from "./pages/profile/Profile.jsx";
import RankUpdate from "./pages/systemAdmin/updateRank/RankUpdate.jsx";
import ViewPlayers from "./pages/viewPlayers/ViewPlayers.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs, playerInputs, clubInputs, clubPlayerInputs, matchInputs, newsInputs ,optionalInputs} from "./formSource.js";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.js";
import AdminProtectedRoute from "./components/protectedRoute/AdminProtectedRoute.js";
import { clubColumns, userColumns, playerColumns,matchColumns, clubPlayerColumns, clubMatchColumns , newsColumns} from "./datatablesource.js";
import MatchListByClub from "./pages/list/MatchListByClub.jsx";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset_password/:id/:token" element={<ResetPassword />} />
            <Route index element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            
            {/* Users */}
            <Route path="settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="users">
              <Route index element={<AdminProtectedRoute><List columns={userColumns} /></AdminProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><ViewUsers /></ProtectedRoute>} />
              <Route path="new" element={<AdminProtectedRoute><New inputs={userInputs} title="Add New User" /></AdminProtectedRoute>} />
            </Route>

            {/* Clubs */}
            <Route path="clubs">
              <Route index element={<AdminProtectedRoute><List columns={clubColumns} /></AdminProtectedRoute>} />
              <Route path=":clubId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<AdminProtectedRoute><NewClub inputs={clubInputs} title="Add New Club" /></AdminProtectedRoute>} />
            </Route>

            {/* Players */}
            <Route path="players">
              <Route index element={<AdminProtectedRoute><PlayerList/></AdminProtectedRoute>} />
              <Route path=":playerId" element={<ProtectedRoute><ViewPlayers /></ProtectedRoute>} />
              
              <Route path="new" element={<AdminProtectedRoute><NewPlayer inputs={playerInputs} optionalInputs={optionalInputs} title="Add New Player" /></AdminProtectedRoute>} />
              <Route path="by-club/:clubId" element={<ProtectedRoute><ClubList columns={clubPlayerColumns} /></ProtectedRoute>} />
              <Route path="by-club/:clubId/new" element={<ProtectedRoute><NewPlayerByClub inputs={playerInputs} optionalInputs={optionalInputs} title="Add New Player" /></ProtectedRoute>} />
            </Route>

            {/* Matches */}
            <Route path="matches">
              <Route index element={<AdminProtectedRoute><MatchList columns={matchColumns} /></AdminProtectedRoute>} />
              <Route path=":matchId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<AdminProtectedRoute><NewMatch inputs={matchInputs} title="Create New Match" /></AdminProtectedRoute>} />
              <Route path="update/:id" element={<UpdateMatch />} />
              <Route path="by-club/:clubId" element={<ProtectedRoute><MatchListByClub columns={clubMatchColumns} /></ProtectedRoute>} />
              <Route path="by-club/new" element={<ProtectedRoute><NewMatchByClub inputs={matchInputs} title="Create New Match" /></ProtectedRoute>} />
            </Route>

            {/* News */}
            <Route path="news">
              <Route index element={<AdminProtectedRoute><List columns={newsColumns} /></AdminProtectedRoute>} />
              <Route path="new" element={<AdminProtectedRoute><NewNews inputs={newsInputs} title="Create New News" /></AdminProtectedRoute>} />
            </Route>

            {/* Rankings */}
            <Route path="ranking" element={<AdminProtectedRoute><RankUpdate /></AdminProtectedRoute>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
