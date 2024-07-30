/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useAuthentication from "../configuration/useAuthentication";
import {
  setCurrentUser,
  setFormErrorMessage,
} from "../configuration/authSlice";
import styles from "./SignInPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { arrow_back } from "../data/fileImports";
import useGoBack from "../hooks/useGoBack";

const SignupPage = () => {
  const { formErrorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { addUser } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (data) => {
    dispatch(setFormErrorMessage(""));
    // Remove confirmPassword from the data object
    const { confirmPassword, ...submitData } = data;
    console.log("Form submitted:", submitData);
    dispatch(setCurrentUser(submitData));
    addUser.mutate(submitData);
  };
  const password = watch("password", "");

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
              !errors.name
                ? styles.label
                : `${styles.label} ${styles["label-error"]}`
            }
          >
            Username
          </label>
          <input
            type="text"
            {...register("name", { required: "Username is required" })}
            placeholder="Enter your username"
            className={
              !errors.name
                ? `${styles.input}`
                : `${styles["error-border"]} ${styles.input}`
            }
          />
          {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        </div>
        <div className={styles.input_div}>
          <label
            className={
              !errors.email
                ? styles.label
                : `${styles.label} ${styles["label-error"]}`
            }
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
            placeholder="Enter your email"
            className={
              !errors.email
                ? `${styles.input}`
                : `${styles["error-border"]} ${styles.input}`
            }
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
            placeholder="Enter your password"
            className={
              !errors.password
                ? `${styles.input}`
                : `${styles["error-border"]} ${styles.input}`
            }
          />
          {errors.password && (
            <p className={styles.error}>{errors.password.message}</p>
          )}
        </div>
        <div className={styles.input_div}>
          <label
            className={
              !errors.confirmPassword
                ? styles.label
                : `${styles.label} ${styles["label-error"]}`
            }
          >
            Confirm Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
            className={
              !errors.confirmPassword
                ? `${styles.input}`
                : `${styles["error-border"]} ${styles.input}`
            }
          />
          {errors.confirmPassword && (
            <p className={styles.error}>{errors.confirmPassword.message}</p>
          )}
        </div>
        {formErrorMessage && <p>{formErrorMessage}</p>}
        <button type="submit" className={styles.button}>
          Sign Up
        </button>
        <p className={`text-center ${styles.options}`}>
          <span>Don&apos;t have an account? </span>{" "}
          <Link to="/signin" className={styles.register}>
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupPage;
