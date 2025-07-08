import { useState } from "react";
import { useForm } from "react-hook-form";
import useAuthStore from "../../../../store/useAuthStore";
import { UserData } from "../../../../types/userTypes";
import styles from "./styles.module.scss";

const AuthForm = () => {
  const [isRegister, setIsRegister] = useState(false);
  const signIn = useAuthStore((state) => state.signIn);
  const signUp = useAuthStore((state) => state.signUp);
  const error = useAuthStore((state) => state.error);
  const setError = useAuthStore((state) => state.setError);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserData>();

  const onSubmit = (data: UserData) => {
    if (isRegister && 'name' in data) {
      signUp(data)
    } else {
      signIn(data)
    }
  };

  return (
    <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <h1>{isRegister ? "Регистрация" : "Вход"}</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            {isRegister && (
              <div className={styles.formGroup}>
                <label>Имя</label>
                <input
                  {...register("name", { required: "Введите имя" })}
                  onChange={() => setError(null)}
                />
                {errors.name && (
                  <p className={styles.error}>{errors.name?.message as string}</p>
                )}
              </div>
            )}
            <div className={styles.formGroup}>
              <label>Email</label>
              <input
                type="email"
                {...register("email", {
                  required: "Введите email",
                  pattern: {
                    value: /^\S+@\S+$/,
                    message: "Некорректный email",
                  },
                })}
                onChange={() => setError(null)}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email?.message as string}</p>
              )}
            </div>
            <div className={styles.formGroup}>
              <label>Пароль</label>
              <input
                type="password"
                {...register("password", {
                  required: "Введите пароль",
                  minLength: {
                    value: 4,
                    message: "Минимум 4 символов",
                  },
                })}
                onChange={() => setError(null)}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password?.message as string}</p>
              )}
              {error && <p className={styles.error}>{error}</p>}
            </div>
            <button type="submit" className={styles.submitButton}>
              {isRegister ? "Зарегистрироваться" : "Войти"}
            </button>
          </form>
          <p className={styles.switchText}>
            {isRegister ? "Уже есть аккаунт?" : "Нет аккаунта?"}{" "}
            <button
              type="button"
              className={styles.switchButton}
              onClick={() => setIsRegister(!isRegister)}
            >
              {isRegister ? "Войти" : "Зарегистрироваться"}
            </button>
          </p>
        </div>
      </div>
  )
}

export default AuthForm;
