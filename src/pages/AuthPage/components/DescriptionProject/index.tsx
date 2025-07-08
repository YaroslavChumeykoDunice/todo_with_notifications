import styles from './styles.module.scss';

const DescriptionProject = () => {
  return (
    <div className={styles.descriptionSection}>
    <div className={styles.descriptionContainer}>
      <h2>NoteFlow</h2>
      <p>
        NoteFlow — современное приложение для создания и хранения заметок.
      </p>
      <ul>
        <li>Создавайте и редактируйте заметки</li>
        <li>Настраивайте уведомления о событиях</li>
        <li>Храните данные в облаке</li>
        <li>Работайте с любого устройства</li>
      </ul>
      <p>Создайте аккаунт или войдите, чтобы начать пользоваться сервисом.</p>
    </div>
  </div>
  )
}

export default DescriptionProject;
