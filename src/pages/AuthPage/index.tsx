import AuthForm from "./components/AuthForm";
import DescriptionProject from "./components/DescriptionProject";
import styles from "./styles.module.scss";

export default function AuthPage() {
  return (
    <div className={styles.authPage}>
      <AuthForm />
      <DescriptionProject />
    </div>
  );
}
