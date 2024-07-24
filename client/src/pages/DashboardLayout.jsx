import { useDispatch } from "react-redux";
import { logout } from "../configuration/authSlice";
import { Outlet, useNavigate, useParams } from "react-router-dom";

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

  return (
    <div className="flex flex-col h-screen w-screen">
      <div>
        {!isSettingsPage && (
          <select onChange={handleOptions}>
            {headerOptions.map((curOption) => (
              <option key={curOption.id} value={curOption.value}>
                {curOption.option}
              </option>
            ))}
          </select>
        )}
      </div>
      <div className="size-full flex flex-col">
        <Outlet />
      </div>
    </div>
  );
}

export default Dashboard;
