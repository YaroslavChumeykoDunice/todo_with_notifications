import { memo } from "react";
import useTasksStore from "../../../../store/useTasksStore";
import { Task } from "../../../../types/tasksTypes";
import TaskItem from "../TaskItem";
import styles from './styles.module.scss'

interface TasksListProps {
  toggleOpenModal: (task?: Task) => void;
}

const TasksList = ({ toggleOpenModal }: TasksListProps) => {
  const tasks = useTasksStore((state) => state.tasks);
  return (
    <div className={styles.tasksList}>
      {tasks.length > 0 ? (
        tasks.map((task) => <TaskItem task={task} key={task.id} toggleOpenModal={toggleOpenModal} />)
      ) : (
        <div>Нет задач</div>
      )}
    </div>
  );
}

export default memo(TasksList);
