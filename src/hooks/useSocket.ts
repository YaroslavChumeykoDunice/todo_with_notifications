import { useEffect } from "react";
import SocketApi from "../socket";
import useTasksStore from "../store/useTasksStore";

const useSubscribeSocket = () => {

  const setNotification = useTasksStore((state) => state.setNotification);

  useEffect(() => {
    SocketApi.createConnection();

    SocketApi.socket?.on('reminder', (data) => {
      setNotification(data);
    })

    return () => {
      SocketApi.disconnect();
    }
  }, [setNotification])

};

export default useSubscribeSocket;
