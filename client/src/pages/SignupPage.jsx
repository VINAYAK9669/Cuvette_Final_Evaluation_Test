/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useAuthentication from "../configuration/useAuthentication";
import {
  setCurrentUser,
  setFormErrorMessage,
} from "../configuration/authSlice";
import { useDispatch, useSelector } from "react-redux";

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

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Username</label>
          <input
            type="text"
            {...register("name", { required: "Username is required" })}
            placeholder="Enter your username"
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}
        </div>
        <div>
          <label>Email</label>
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
          />
          {errors.email && (
            <p style={{ color: "red" }}>{errors.email.message}</p>
          )}
        </div>
        <div>
          <label>Password</label>
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
          />
          {errors.password && (
            <p style={{ color: "red" }}>{errors.password.message}</p>
          )}
        </div>
        <div>
          <label>Confirm Password</label>
          <input
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === password || "Passwords do not match",
            })}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword.message}</p>
          )}
        </div>
        {formErrorMessage && <p>{formErrorMessage}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupPage;
