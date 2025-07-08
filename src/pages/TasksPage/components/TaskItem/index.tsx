import styles from "./styles.module.scss";
import { Task } from "../../../../types/tasksTypes";
import useTasksStore from "../../../../store/useTasksStore";
import { memo } from "react";
import dayjs from "dayjs";

interface TaskItemProps {
  task: Task;
  toggleOpenModal: (task?: Task) => void;
}

const TaskItem = ({ task, toggleOpenModal }: TaskItemProps) => {
  const deleteTask = useTasksStore((state) => state.deleteTask);
  const updateTask = useTasksStore((state) => state.updateTask);
  return (
    <div className={styles.taskItem}>
      <div className={styles.taskHeader}>
        <h3>{task.title}</h3>
        <span className={styles.status} onClick={() => updateTask({ isCompleted: !task.isCompleted }, task.id)}>
          {task.isCompleted ? "✅ Выполнено" : "⏳ Не выполнено"}
        </span>
      </div>

      <p className={styles.description}>{task.description}</p>

      <div className={styles.taskFooter}>
        {task.reminderTime && (
          <p className={styles.reminder}>
            ⏰ Напоминание: {dayjs.utc(task.reminderTime).local().format("YYYY-MM-DD HH:mm")}
          </p>
        )}
        <div className={styles.btnGroup}>
          <button className={styles.update} onClick={() => toggleOpenModal(task)}>Обновить</button>
          <button className={styles.delete} onClick={() => deleteTask(task.id)}>Удалить</button>
        </div>
      </div>
    </div>
  );
}

export default memo(TaskItem);
