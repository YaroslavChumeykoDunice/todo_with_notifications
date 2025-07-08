import { memo, useCallback, useMemo } from "react";
import Modal from "../../../../components/Modal";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { Task } from "../../../../types/tasksTypes";
import useTasksStore from "../../../../store/useTasksStore";
import dayjs from "dayjs";

interface CreateOrUpdateModalProps {
  onClose: () => void;
  initialData?: Task;
}

const CreateOrUpdateModal = ({
  onClose,
  initialData,
}: CreateOrUpdateModalProps) => {
  const createTask = useTasksStore(state => state.createTask);
  const updateTask = useTasksStore(state => state.updateTask);

  const initialValues = useMemo(() => initialData
    ? {
      ...initialData,
      reminderTime: initialData.reminderTime ? dayjs(initialData.reminderTime).format("YYYY-MM-DDTHH:mm") : null }
    : undefined,
    [initialData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Task>({
    defaultValues: initialValues
  });

  const onSubmit = useCallback((task: Task) => {

    const newTask = {
      ...task,
      reminderTime: task.reminderTime ? dayjs(task.reminderTime).utc().toISOString() : null,
    }

    if (initialData) {
      updateTask(newTask, initialData.id);
    } else {
      createTask(newTask);
    }
  }, [createTask, initialData, updateTask])

  return (
    <Modal
      isOpen
      title={initialData ? "Редактировать задачу" : "Создать задачу"}
      onClose={onClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <div className={styles.field}>
          <input
            {...register("title", { required: "Введите название" })}
            placeholder="Название"
          />
          {errors.title && <span className={styles.error}>{errors.title.message}</span>}
        </div>
        <div className={styles.field}>
          <textarea
            {...register("description", { required: "Введите описание" })}
            placeholder="Описание"
          />
          {errors.description && <span className={styles.error}>{errors.description.message}</span>}
        </div>
        <div className={styles.field}>
          <label>Дата и время напоминания</label>
          <input
            type="datetime-local"
            {...register("reminderTime")}
          />
          {errors.reminderTime && <span className={styles.error}>{errors.reminderTime.message}</span>}
        </div>
        <div className={styles.checkboxField}>
          <label>
            <input type="checkbox" {...register("isCompleted")} />
            Завершено
          </label>
        </div>
        <button type="submit" className={styles.submitButton}>
          {initialData ? "Сохранить изменения" : "Создать задачу"}
        </button>
      </form>
    </Modal>
  );
};

export default memo(CreateOrUpdateModal);
