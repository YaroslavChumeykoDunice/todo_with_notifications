import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import useAuthStore from "../store/useAuthStore";

interface RestrictAuthRouteProps {
  children: ReactNode;
}

const RestrictAuthRoute = ({ children }: RestrictAuthRouteProps) => {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      {user ? <Navigate to="/" /> : children}
    </>
  )
}

export default RestrictAuthRoute;
