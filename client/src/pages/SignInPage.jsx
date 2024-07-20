/* eslint-disable no-unused-vars */
import { useForm } from "react-hook-form";
import useAuthentication from "../configuration/useAuthentication";
import { useSelector } from "react-redux";

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

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
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
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </div>
        <div className="mb-4">
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
            placeholder="*******"
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </div>
        {formErrorMessage && <p>{formErrorMessage}</p>}
        <div>
          <button type="submit">Log In</button>
          <p>
            <span>Don&apos;t have an account? </span> <span>Register now</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default SignInPage;
