/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { onCloseModal, onOpenModal } from "./modalSlice";
import ModalContent from "../components/ModalContent";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthentication from "../configuration/useAuthentication";
import styles from "./Workspace.module.css";
import { createFolderIcon, delete_icon } from "../data/fileImports";
import Forms from "../components/Workspace/Forms";
import { setSelectedFolder } from "../configuration/authSlice";

function WorkSpace() {
  const dispatch = useDispatch();
  const [folderName, setFolderName] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const { userID } = useParams();
  const { createFolder, fetchAllFolders, deleteFolderById } =
    useAuthentication();
  const { userFolders, selectedFolder } = useSelector((state) => state.auth);
  const folderListsRef = useRef(null);
  const createTypeBotRef = useRef(null);
  const formsRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllFolders.mutate(userID);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        folderListsRef.current &&
        !folderListsRef.current.contains(event.target) &&
        createTypeBotRef.current &&
        !createTypeBotRef.current.contains(event.target) &&
        formsRef.current &&
        !formsRef.current.contains(event.target)
      ) {
        setSelectedFolderId(null);
        dispatch(setSelectedFolder(null));
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  function onSubmit(e) {
    e.preventDefault();
    const userId = userID;
    if (!folderName?.trim()) {
      alert("Folder Name is required");
      return;
    }
    const data = { folderName, userId };
    createFolder.mutate(data);
  }

  function handleOpenDeleteModal(folderId) {
    setSelectedFolderId(folderId);
    dispatch(onOpenModal());
  }

  function handleCloseDeleteModal() {
    setSelectedFolderId(null);
    dispatch(onCloseModal());
  }

  function handleDeleteFolder() {
    if (selectedFolderId) {
      deleteFolderById.mutate(selectedFolderId);
      handleCloseDeleteModal();
    }
  }

  return (
    <div className={styles.container}>
      <div
        className={`flex justify-between items-center ${styles.folder_section}`}
      >
        <p
          onClick={() => dispatch(onOpenModal())}
          className={`flex items-center ${styles.create_folder}`}
          ref={createTypeBotRef}
        >
          <img src={createFolderIcon} /> &nbsp;Create a folder
        </p>
        <div
          ref={folderListsRef}
          className={`flex justify-start items-center ${styles.folderLists}`}
        >
          {userFolders.map((folder) => (
            <div
              className={styles.folderList}
              key={folder.folderId}
              onClick={() => dispatch(setSelectedFolder(folder._id))}
              style={
                selectedFolder === folder._id
                  ? { border: "2px solid white" }
                  : {}
              }
            >
              <p style={{ minWidth: "80px" }}>{folder.folderName}</p>
              <div>
                <img
                  src={delete_icon}
                  onClick={() => handleOpenDeleteModal(folder._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex" style={{ gap: "1rem" }}>
        <ModalContent>
          <div className="modalContent">
            <h1>Create a Folder</h1>
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Enter folder name"
            />
            <div className="buttons">
              <button onClick={onSubmit}>Done</button>
              <span></span>
              <button onClick={() => dispatch(onCloseModal())}>Close</button>
            </div>
          </div>
        </ModalContent>
      </div>
      {selectedFolderId && (
        <ModalContent>
          <div className="modalContent">
            <h1>Are you sure you want to delete this Folder?</h1>
            <div className="buttons">
              <button onClick={handleDeleteFolder}>Done</button>
              <span></span>
              <button onClick={handleCloseDeleteModal}>Close</button>
            </div>
          </div>
        </ModalContent>
      )}
      <div ref={formsRef}>
        <Forms />
      </div>
    </div>
  );
}

export default WorkSpace;
