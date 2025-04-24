import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {

    const uid = useSelector((state: RootState) => state.user.uid)

    if (!uid) {
        return <Navigate to='/login' replace />
    }

    return <>{children}</>;

}

export default ProtectedRoute;