import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext.js";


const AdminProtectedRoute = ({ children }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />;
    }

    return children;
};

export default AdminProtectedRoute;
