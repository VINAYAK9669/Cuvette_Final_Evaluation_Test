/* eslint-disable react/prop-types */
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { closeIcon } from "../../data/fileImports";
import styles from "./NavWorkSpaceTool.module.css";
import { v4 as uuidv4 } from "uuid";
import useAuthentication from "../../configuration/useAuthentication";
import toast from "react-hot-toast";

function NavWorkSpaceTool({ onSave, setFormName, formName, handleSetTheme }) {
  const { userID, folderId, formId } = useParams();
  const { updateForm, getFormDetails, addDetailsToNewLink } =
    useAuthentication();
  const navigate = useNavigate();
  function hadndleSave() {
    // Check if the URL contains 'flow'
    if (location.pathname.includes("flow")) {
      onSave();
    }

    if (location.pathname.includes("theme")) {
      handleSetTheme();
    }
  }
  function handleSharedLink() {
    console.log(getFormDetails.data);
    try {
      const sharedLinkCode = uuidv4();
      const sharedLink = `${window.location.origin}/share/${sharedLinkCode}`;
      updateForm.mutate({ ...getFormDetails.data?.data, sharedLink });
      addDetailsToNewLink.mutate({
        userId: userID,
        sharedLink: sharedLink,
        formDetails: getFormDetails.data?.data?.formDetails,
        totalInputs: getFormDetails.data?.data?.formDetails.length,
        theme: getFormDetails.data?.data?.theme,
      });

      navigator.clipboard.writeText(sharedLink);
      toast.success("Shared link copied to clipboard");
    } catch (error) {
      console.error("Error creating shared link", error);
      toast.error("Error creating shared link");
    }
  }
  const handleBlur = (event) => {
    setFormName(event.target.value);
  };

  return (
    <div
      className={`flex justify-between items-center w-screen ${styles.container}`}
    >
      <div className={styles.inputDiv}>
        <input
          type="text"
          placeholder="Enter Form Name"
          defaultValue={formName}
          onBlur={handleBlur}
        />
      </div>
      <div className={`flex ${styles.middle_options}`}>
        <NavLink
          to={`/dashboard/${userID}/workspacetool/${
            folderId ? folderId + "/" : ""
          }flow/${formId ? formId : ""}`}
          className={({ isActive }) =>
            `${styles.path} ${isActive ? styles.active_div : ""}`
          }
        >
          <span>Flow</span>
        </NavLink>

        <NavLink
          to={`/dashboard/${userID}/workspacetool/${
            folderId ? folderId + "/" : ""
          }theme/${formId ? formId : ""}`}
          className={({ isActive }) =>
            `${styles.path} ${isActive ? styles.active_div : ""}`
          }
        >
          Theme
        </NavLink>

        <NavLink
          to={`/dashboard/${userID}/workspacetool/${
            folderId ? folderId + "/" : ""
          }response/${formId ? formId : ""}`}
          className={({ isActive }) =>
            `${styles.path} ${isActive ? styles.active_div : ""}`
          }
        >
          Response
        </NavLink>
      </div>
      <div className={`flex items-center ${styles.buttons}`}>
        <button onClick={handleSharedLink}>Share</button>
        <button className={styles.saveButton} onClick={hadndleSave}>
          Save
        </button>
        <img src={closeIcon} onClick={() => navigate(`/dashboard/${userID}`)} />
      </div>
    </div>
  );
}

export default NavWorkSpaceTool;
