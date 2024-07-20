import { useDispatch } from "react-redux";
import { logout } from "../configuration/authSlice";

function Dashboard() {
  const dispatch = useDispatch();

  const { userName } = JSON.parse(localStorage.getItem("loggedUser"));
  const headerOptions = [
    { id: 0, option: `${userName}'s`, value: "dashboard" },
    { id: 1, option: "Settings", value: "settings" },
    { id: 2, option: "Log Out", value: "logout" },
  ];

  function handleOptions(e) {
    e.preventDefault();
    console.log(e.target.value);
    const value = e.target.value;
    if (value === "logout") {
      dispatch(logout());
    }
  }

  return (
    <div>
      <select onChange={handleOptions}>
        {headerOptions.map((curOption) => (
          <option key={curOption.id} value={curOption.value}>
            {curOption.option}
          </option>
        ))}
      </select>
      <div></div>
    </div>
  );
}

export default Dashboard;
