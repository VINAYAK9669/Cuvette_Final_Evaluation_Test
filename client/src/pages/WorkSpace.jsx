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
  const [isCreateFolderModalOpen, setIsCreateFolderModalOpen] = useState(false);
  const [selectedFolderId, setSelectedFolderId] = useState(null);
  const { userID } = useParams();
  const { createFolder, fetchAllFolders, deleteFolderById } =
    useAuthentication();
  const { userFolders, selectedFolder } = useSelector((state) => state.auth);
  const folderListsRef = useRef(null);
  const createTypeBotRef = useRef(null);
  const formsRef = useRef(null);
  const { modalIsOpen } = useSelector((state) => state.modal);

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
    setFolderName("");
    setIsCreateFolderModalOpen(false);
  }

  function handleOpenDeleteModal(folderId) {
    console.log(folderId);
    setSelectedFolderId(folderId);
    dispatch(onOpenModal());
  }

  function handleCloseDeleteModal() {
    setSelectedFolderId(null);
    dispatch(onCloseModal());
  }

  function handleDeleteFolder() {
    console.log(selectedFolderId, "Selected Folder Id");
    if (selectedFolderId) {
      deleteFolderById.mutate(selectedFolderId);
      handleCloseDeleteModal();
      setSelectedFolderId(null);
    } else {
      handleCloseDeleteModal();
    }
  }

  useEffect(() => {
    if (!modalIsOpen) {
      setIsCreateFolderModalOpen(false);
      setSelectedFolderId(null);
    }
  }, [modalIsOpen]);

  useEffect(() => {
    const handleHorizontalScroll = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        folderListsRef.current.scrollLeft += event.deltaY;
      }
    };

    const folderListEl = folderListsRef.current;
    if (folderListEl) {
      folderListEl.addEventListener("wheel", handleHorizontalScroll);
    }

    return () => {
      if (folderListEl) {
        folderListEl.removeEventListener("wheel", handleHorizontalScroll);
      }
    };
  }, []);
  return (
    <div className={styles.container}>
      <div
        className={`flex justify-between items-center ${styles.folder_section}`}
      >
        <p
          onClick={() =>
            dispatch(onOpenModal(), setIsCreateFolderModalOpen(true))
          }
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
        {isCreateFolderModalOpen ? (
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
                <button
                  onClick={() =>
                    dispatch(onCloseModal(), setIsCreateFolderModalOpen(false))
                  }
                >
                  Close
                </button>
              </div>
            </div>
          </ModalContent>
        ) : (
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
      </div>

      <div ref={formsRef}>
        <Forms />
      </div>
    </div>
  );
}

export default WorkSpace;
