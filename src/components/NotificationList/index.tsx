import { memo } from "react";
import useSubscribeSocket from "../../hooks/useSocket";
import useTasksStore from "../../store/useTasksStore";
import styles from "./styles.module.scss";

const NotificationList = () => {
  useSubscribeSocket();

  const notifications = useTasksStore((state) => state.notifications);
  const setNotification = useTasksStore((state) => state.setNotification);
  return (
    <div className={styles.notificationsList}>
      {notifications.map((task) => (
        <div className={styles.notificationItem} key={task.id}>
          <div className={styles.notificationContent}>
            <span className={styles.icon}>🔔</span>
            <h4>{task.title}</h4>
          </div>
          <div className={styles.close} onClick={() => setNotification(task, true)}>X</div>
        </div>
      ))}
    </div>
  );
};

export default memo(NotificationList);
