import { RouterProvider } from "react-router-dom"
import router from "./router"
import useAuthStore from "./store/useAuthStore"
import { useEffect } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";

const App = () => {

  dayjs.extend(utc);

  const getMyProfile = useAuthStore(state => state.getMyProfile);
  useEffect(() => {
    getMyProfile();
  }, [getMyProfile])

  return (
    <RouterProvider router={router} />
  )
}

export default App;
