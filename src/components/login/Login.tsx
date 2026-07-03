import { useForm } from "react-hook-form";
import styles from "../../module/dashboard.module.css";
import type { LoginType } from "../../types/login";
import { useLogin } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { userLogin } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onsubmit = (data: LoginType) => {
    userLogin(data, {
      onSuccess: () => {
        navigate("/dashboard");
      },
      onError: (error) => {
        alert(error.message);
      },
    });
  };

  return (
    <div className={styles.loginForm}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className={styles.formInput}>
          <label>Email </label>
          <input
            type="email"
            placeholder="Email.."
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email",
              },
            })}
          />
          {errors.email && (
            <p className={styles.error}>{errors.email?.message}</p>
          )}
        </div>
        <div className={styles.formInput}>
          <label>Email </label>
          <input
            type="password"
            placeholder="Password.."
            {...register("password", {
              required: "Password is required",
            })}
          />
          {errors.password && (
            <p className={styles.error}>{errors.password?.message}</p>
          )}
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
