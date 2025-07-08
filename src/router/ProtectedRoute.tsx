import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useAuthStore((state) => state.user);
  return (
    <>
      {user ? children : <Navigate to="/auth" />}
    </>
  )
}

export default ProtectedRoute;
