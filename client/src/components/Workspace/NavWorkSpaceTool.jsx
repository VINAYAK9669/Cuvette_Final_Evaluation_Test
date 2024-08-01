/* eslint-disable react/prop-types */
import { NavLink, useParams } from "react-router-dom";
import { closeIcon } from "../../data/fileImports";
import styles from "./NavWorkSpaceTool.module.css";

function NavWorkSpaceTool({ onSave }) {
  const { userID, folderId } = useParams();
  function hadndleSave() {
    onSave();
  }
  return (
    <div
      className={`flex justify-between items-center w-screen ${styles.container}`}
    >
      <div className={styles.inputDiv}>
        <input type="text" placeholder="Enter Form Name" />
      </div>
      <div className={`flex ${styles.middle_options}`}>
        <NavLink
          to={`/dashboard/${userID}/workspacetool/${
            folderId ? folderId + "/" : ""
          }flow`}
          className={({ isActive }) =>
            `${styles.path} ${isActive ? styles.active_div : ""}`
          }
        >
          <span>Flow</span>
        </NavLink>

        <NavLink
          to={`/dashboard/${userID}/workspacetool/${
            folderId ? folderId + "/" : ""
          }theme`}
          className={({ isActive }) =>
            `${styles.path} ${isActive ? styles.active_div : ""}`
          }
        >
          Theme
        </NavLink>

        <NavLink
          to={`/dashboard/${userID}/workspacetool/${
            folderId ? folderId + "/" : ""
          }response`}
          className={({ isActive }) =>
            `${styles.path} ${isActive ? styles.active_div : ""}`
          }
        >
          Response
        </NavLink>
      </div>
      <div className={`flex items-center ${styles.buttons}`}>
        <button>Share</button>
        <button className={styles.saveButton} onClick={hadndleSave}>
          Save
        </button>
        <img src={closeIcon} />
      </div>
    </div>
  );
}

export default NavWorkSpaceTool;
