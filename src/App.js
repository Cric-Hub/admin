import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import ForgotPassword from "./components/forgotPassword/ForgotPassword.jsx";
import ResetPassword from "./components/resetPassword/ResetPassword.jsx";
import List from "./pages/list/List.jsx";
import ClubList from "./pages/list/ClubList.jsx";
import MatchList from "./pages/list/MatchList.jsx";
import Single from "./pages/single/Single.jsx";
import New from "./pages/new/New.jsx";
import NewPlayer from "./pages/newPlayer/NewPlayer.jsx";
import NewClub from "./pages/newClub/NewClub.jsx";
import NewMatch from "./pages/newMatch/NewMatch.jsx";
import NewNews from "./pages/newNews/NewNews.jsx";
import UpdateMatch from "./pages/updateMatch/UpdateMatch.jsx";
import ViewUsers from "./pages/viewUsers/ViewUsers.jsx";
import ViewPlayers from "./pages/viewPlayers/ViewPlayers.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs, playerInputs, clubInputs, clubPlayerInputs, matchInputs, newsInputs } from "./formSource.js";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.js";
import AdminProtectedRoute from "./components/protectedRoute/AdminProtectedRoute.js";
import { clubColumns, userColumns, playerColumns,matchColumns, clubPlayerColumns, clubMatchColumns , newsColumns} from "./datatablesource.js";
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
              <Route index element={<AdminProtectedRoute><List columns={playerColumns} /></AdminProtectedRoute>} />
              <Route path=":playerId" element={<ProtectedRoute><ViewPlayers /></ProtectedRoute>} />
              
              <Route path="new" element={<AdminProtectedRoute><NewPlayer inputs={playerInputs} title="Add New Player" /></AdminProtectedRoute>} />
              <Route path="by-club/:clubId" element={<ProtectedRoute><ClubList columns={clubPlayerColumns} /></ProtectedRoute>} />
              <Route path="by-club/:clubId/new" element={<ProtectedRoute><NewPlayer inputs={playerInputs} title="Add New Player" /></ProtectedRoute>} />
            </Route>

            {/* Matches */}
            <Route path="matches">
              <Route index element={<AdminProtectedRoute><List columns={matchColumns} /></AdminProtectedRoute>} />
              <Route path=":matchId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<AdminProtectedRoute><NewMatch inputs={matchInputs} title="Create New Match" /></AdminProtectedRoute>} />
              <Route path="update/:id" element={<UpdateMatch />} />
              <Route path="by-club/:clubId" element={<ProtectedRoute><MatchList columns={clubMatchColumns} /></ProtectedRoute>} />
              <Route path="by-club/new" element={<ProtectedRoute><NewMatch inputs={matchInputs} title="Create New Match" /></ProtectedRoute>} />
            </Route>

            {/* News */}
            <Route path="news">
              <Route index element={<AdminProtectedRoute><List columns={newsColumns} /></AdminProtectedRoute>} />
              <Route path="new" element={<AdminProtectedRoute><NewNews inputs={newsInputs} title="Create New News" /></AdminProtectedRoute>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
