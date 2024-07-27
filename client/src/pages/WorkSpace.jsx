/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { onCloseModal, onOpenModal } from "./modalSlice";
import ModalContent from "../components/ModalContent";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useAuthentication from "../configuration/useAuthentication";

function WorkSpace() {
  const disptach = useDispatch();
  const [folderName, setFolderName] = useState();
  const { userID } = useParams();
  const { createFolder } = useAuthentication();
  const { userFolders } = useSelector((state) => state.auth);
  const { fetchAllFolders, deleteFolderById } = useAuthentication();

  function onSubmit() {
    const createdBy = userID;
    if (!folderName?.trim()) {
      alert("File Name is required");
      return;
    }
    const data = { name: folderName, createdBy };
    createFolder.mutate(data);
  }

  useEffect(() => {
    fetchAllFolders.mutate(userID);
  }, []);

  function deleteFolder(folderId) {
    deleteFolderById.mutate(folderId);
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex " style={{ gap: "5rem" }}>
        <p onClick={() => disptach(onOpenModal())}>Create a folder</p>
        {!userFolders[0].titledFolders > 0 && (
          <div
            className="flex"
            style={{ overflow: "scroll", gap: "1rem", width: "60vw" }}
          >
            {userFolders &&
              userFolders[0]?.titledFolders?.map((folder, index) => (
                <div key={index}>
                  <p style={{ width: "30vw" }}>{folder.name}</p>
                  <span onClick={() => deleteFolder(folder._id)}>🗑️</span>
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="flex " style={{ gap: "1rem" }}>
        <ModalContent>
          <h1>Create a Folder</h1>
          <input type="text" onChange={(e) => setFolderName(e.target.value)} />
          <div>
            <button onClick={onSubmit}>Done</button>
            <button onClick={() => disptach(onCloseModal())}>Close</button>
          </div>
        </ModalContent>
      </div>
      <div>
        <Link to="workspacetool">Create a typebot</Link>
        <div></div>
      </div>
    </div>
  );
}

export default WorkSpace;
