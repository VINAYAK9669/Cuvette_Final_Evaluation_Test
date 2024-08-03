import { useForm } from "react-hook-form";
import usericon from "/assets/settings/icon.svg";
import styles from "./SettingPage.module.css";
import useAuthentication from "../configuration/useAuthentication";
import toast from "react-hot-toast";

function SettingPage() {
  const { updateUserDetails } = useAuthentication();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    const { oldPassword, password, name, email } = data;

    // Check if at least one field is filled
    if (!oldPassword && !password && !name && !email) {
      toast.error("What do you want to update?");
      return;
    }

    // If the new password is entered, the old password must be provided
    if (password && !oldPassword) {
      toast.error("Old password is required to update your password.");
      return;
    }

    // Filter out empty fields
    const filteredData = Object.fromEntries(
      Object.entries(data).filter(([, value]) => value)
    );

    // Prepare the data for submission
    updateUserDetails.mutate(filteredData);
  };

  return (
    <div
      className={`w-screen h-screen flex flex-col justify-center items-center`}
    >
      <div>
        <h1 className={styles.header}>Settings</h1>
      </div>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <div className={`flex flex-col`}>
          <div className={`flex items-center ${styles.input_container}`}>
            <div className={`flex justify-center items-center`}>
              <img src={usericon} alt="User Icon" />
            </div>
            <input type="text" placeholder="Name" {...register("name")} />
          </div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`flex items-center ${styles.input_container}`}>
            <div className={`flex justify-center items-center`}>
              <img src={usericon} alt="User Icon" />
            </div>
            <input
              type="email"
              placeholder="Update Email"
              {...register("email", {
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Email is invalid",
                },
              })}
              className={errors.email ? styles.errorInput : ""}
            />
          </div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`flex items-center ${styles.input_container}`}>
            <div className={`flex justify-center items-center`}>
              <img src={usericon} alt="User Icon" />
            </div>
            <input
              type="password"
              placeholder="Old Password"
              {...register("oldPassword", {
                required: {
                  value: false, // Optional but required if changing password
                  message: "Old password is required if updating password",
                },
              })}
              className={errors.oldPassword ? styles.errorInput : ""}
            />
          </div>
        </div>
        <div className={`flex flex-col`}>
          <div className={`flex items-center ${styles.input_container}`}>
            <div className={`flex justify-center items-center`}>
              <img src={usericon} alt="User Icon" />
            </div>
            <input
              type="password"
              placeholder="New Password"
              {...register("newPassword")}
            />
          </div>
        </div>
        <button type="submit" disabled={isSubmitting} className={styles.button}>
          Update
        </button>
      </form>
    </div>
  );
}

export default SettingPage;
