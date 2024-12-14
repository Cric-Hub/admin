import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import List from "./pages/list/List.jsx";
import ClubList from "./pages/list/ClubList.jsx";
import Single from "./pages/single/Single.jsx";
import New from "./pages/new/New.jsx";
import NewPlayer from "./pages/newPlayer/NewPlayer.jsx";
import NewClub from "./pages/newClub/NewClub.jsx";
import NewMatch from "./pages/newMatch/NewMatch.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { userInputs, playerInputs, clubInputs } from "./formSource.js";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.js";
import AdminProtectedRoute from "./components/protectedRoute/AdminProtectedRoute.js";
import { clubColumns, userColumns, playerColumns, clubPlayerColumns } from "./datatablesource.js";

function App() {
  const { darkMode } = useContext(DarkModeContext);


  return (
    <div className={darkMode ? "app dark" : "app"}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route path="login" element={<Login />} />
            <Route index element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
            <Route path="users">
              <Route index element={ <AdminProtectedRoute> <List columns={userColumns}/> </AdminProtectedRoute>} />
              <Route path=":userId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<AdminProtectedRoute><New inputs={userInputs} title="Add New User" /></AdminProtectedRoute>}
              />
            </Route>
            <Route path="clubs">
              <Route index element={<AdminProtectedRoute><List columns={clubColumns}/></AdminProtectedRoute>} />
              <Route path=":clubId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<AdminProtectedRoute><NewClub inputs={clubInputs} title="Add New Club" /></AdminProtectedRoute>}
              />
            </Route>
            <Route path="players">
              <Route index element={<AdminProtectedRoute><List columns={playerColumns}/></AdminProtectedRoute>} />
              <Route path=":playerId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route
                path="new"
                element={<AdminProtectedRoute><NewPlayer inputs={playerInputs} title="Add New Player" /></AdminProtectedRoute>}
              />
            </Route>

            <Route path="players">
              {/* Route for fetching players by club */}
              <Route
                path="by-club"
                element={
                  <ProtectedRoute>
                    <ClubList columns={clubPlayerColumns} />
                  </ProtectedRoute>}/>
              <Route path=":playerId" element={<ProtectedRoute><Single /></ProtectedRoute>} />
              <Route path="new" element={<ProtectedRoute><NewPlayer inputs={playerInputs} title="Add New Player" /></ProtectedRoute>} />
            </Route>
            
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
