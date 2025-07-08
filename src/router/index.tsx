import { Navigate, createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import RestrictAuthRoute from "./RestrictAuthRoute";
import AuthPage from "../pages/AuthPage";
import TasksPage from "../pages/TasksPage";
import useTasksStore from "../store/useTasksStore";
import useAuthStore from "../store/useAuthStore";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute><TasksPage /></ProtectedRoute>,
    loader: async () => {
      const user = useAuthStore.getState().user;
      if (user) {
        await useTasksStore.getState().getTasks();
      }
    },
  },
  {
    path: "/auth",
    element: <RestrictAuthRoute><AuthPage /></RestrictAuthRoute>,
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
])

export default router;
