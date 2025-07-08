import { useCallback, useEffect, useState } from "react";
import TasksList from "./components/TasksList";
import styles from './styles.module.scss'
import CreateOrUpdateModal from "./components/CreateOrUpdateModal";
import { Task } from "../../types/tasksTypes";
import useTasksStore from "../../store/useTasksStore";
import NotificationList from "../../components/NotificationList";

const TasksPage = () => {
  const isUpdate = useTasksStore((state) => state.isUpdate);
  const setUpdate = useTasksStore((state) => state.setUpdate);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task>();

  const toggleOpenModal = useCallback((task?: Task) => {
    setIsOpenModal((prev) => {
      if (prev) {
        setCurrentTask(undefined);
      } else setCurrentTask(task);
      return !prev;
    });
  }, []);

  useEffect(() => {
    if (isUpdate) {
      setIsOpenModal(false);
      setCurrentTask(undefined);
      setUpdate(false);
    }
  }, [isUpdate, setUpdate, toggleOpenModal]);

  return (
    <div className={styles.tasksPage}>
      <div className={styles.header}>
        <h1>Мои задачи</h1>
        <button onClick={() => toggleOpenModal()} className={styles.addTask}>
          <span className={styles.plus}>+</span>
          Добавить задачу
        </button>
      </div>
      <TasksList toggleOpenModal={toggleOpenModal} />
      <NotificationList />
      {isOpenModal && <CreateOrUpdateModal onClose={toggleOpenModal} initialData={currentTask}/>}
    </div>
  )
}

export default TasksPage;
