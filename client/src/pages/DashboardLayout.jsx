import { useDispatch } from "react-redux";
import { logout } from "../configuration/authSlice";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import styles from "./DashboardLayout.module.css";

function Dashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userID } = useParams();

  const { userName } = JSON.parse(localStorage.getItem("loggedUser"));
  const headerOptions = [
    { id: 0, option: `${userName}'s`, value: "dashboard" },
    { id: 1, option: "Settings", value: "settings" },
    { id: 2, option: "Log Out", value: "logout" },
  ];

  function handleOptions(e) {
    e.preventDefault();
    const value = e.target.value;
    if (value === "logout") {
      dispatch(logout());
    } else if (value === "settings") {
      navigate("settings");
    } else if (value === "dashboard") {
      navigate(`/dashboard/${userID}`);
    }
  }

  // Check if the URL contains the word 'settings'
  const isSettingsPage = location.pathname.includes("settings");
  const isWorkSpaceTool = location.pathname.includes("workspacetool");

  return (
    <div className="flex flex-col justify-center h-screen w-screen">
      {!isSettingsPage && !isWorkSpaceTool && (
        <div className={styles.menu}>
          <div className={styles.wrapper}>
            <select
              onChange={handleOptions}
              className={styles.optionsContainer}
            >
              {headerOptions.map((curOption) => (
                <option key={curOption.id} value={curOption.value}>
                  {curOption.option}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="size-full flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
