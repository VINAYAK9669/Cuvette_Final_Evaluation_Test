/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useAuthentication from "../configuration/useAuthentication";
import { useSelector } from "react-redux";
import styles from "./SignInPage.module.css";
import { Link } from "react-router-dom";
import { arrow_back } from "../data/fileImports";
import useGoBack from "../hooks/useGoBack";

function SignInPage() {
  const { formErrorMessage } = useSelector((state) => state.auth);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // TODO: Importing React Query logic
  const { userLogin } = useAuthentication();

  const onSubmit = (data) => {
    userLogin.mutate(data);
  };

  const goBack = useGoBack();

  return (
    <div
      className={`w-screen h-screen flex items-center justify-center ${styles.container}`}
    >
      <div className={styles.flot_arrow_back}>
        <img src={arrow_back} onClick={() => goBack()} />
      </div>
      <form
        className={`flex flex-col ${styles.input_wrapper}`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={styles.input_div}>
          <label
            className={
              !errors.email
                ? styles.label
                : `${styles.label} ${styles["label-error"]}`
            }
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "Email is invalid",
              },
            })}
            className={
              !errors.email
                ? `${styles.input}`
                : `${styles["error-border"]} ${styles.input}`
            }
            placeholder="Enter your email"
            id="email"
          />
          {errors.email && (
            <p className={styles.error}>{errors.email.message}</p>
          )}
        </div>
        <div className={styles.input_div}>
          <label
            className={
              !errors.password
                ? styles.label
                : `${styles.label} ${styles["label-error"]}`
            }
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            className={
              !errors.password
                ? `${styles.input}`
                : `${styles["error-border"]} ${styles.input}`
            }
            placeholder="*******"
            id="password"
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        {formErrorMessage && <p className={styles.error}>{formErrorMessage}</p>}
        <div className={`flex flex-col ${styles.buttons}`}>
          <button type="submit" className={styles.button}>
            Log In
          </button>
          <p className={`text-center ${styles.options}`}>
            <span>Don&apos;t have an account? </span>{" "}
            <Link to="/signup" className={styles.register}>
              Register now
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
