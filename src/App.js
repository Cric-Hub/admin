import Home from "./pages/home/Home.jsx";
import Login from "./pages/login/Login.jsx";
import List from "./pages/list/List.jsx";
import Single from "./pages/single/Single.jsx";
import New from "./pages/new/New.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { productInputs, userInputs } from "./formSource.js";
import "./style/dark.scss";
import { useContext } from "react";
import { DarkModeContext } from "./context/darkModeContext.js";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute.js";
import AdminProtectedRoute from "./components/protectedRoute/AdminProtectedRoute.js";
import { clubColumns, userColumns } from "./datatablesource.js";

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
                element={<AdminProtectedRoute><New inputs={productInputs} title="Add New Club" /></AdminProtectedRoute>}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
