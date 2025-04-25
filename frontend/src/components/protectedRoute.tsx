import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";
import { getAuth } from "firebase/auth";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

    const uid = useSelector((state: RootState) => state.user.uid)
    const auth = getAuth();
    const user = auth.currentUser;

    // If no uid in Redux, fallback to Firebase
    const isAuthenticated = uid || (user && user.emailVerified);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;

}

export default ProtectedRoute;