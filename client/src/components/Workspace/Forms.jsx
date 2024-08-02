/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import useAuthentication from "../../configuration/useAuthentication";
import { delete_icon, plus_icon } from "../../data/fileImports";
import styles from "./Form.module.css";
import ModalContent from "../ModalContent";
import { useState } from "react";
import { onCloseModal, onOpenModal } from "../../pages/modalSlice";
import { useNavigate, useParams } from "react-router-dom";
import { setSelectedFolder } from "../../configuration/authSlice";

function Forms() {
  const dispatch = useDispatch();
  const { deleteFormById, formsWithUserId, createForm } = useAuthentication();
  const [selectedFormId, setSelectedFormId] = useState(null);
  const navigate = useNavigate();
  const { userID } = useParams();

  const { selectedFolder } = useSelector((state) => state.auth);

  const handleOpenModal = (formId) => {
    setSelectedFormId(formId);
    dispatch(onOpenModal());
  };

  const handleCloseModal = () => {
    setSelectedFormId(null);
    dispatch(onCloseModal());
  };

  const handleDeleteForm = () => {
    if (selectedFormId) {
      deleteFormById.mutate(selectedFormId);
      handleCloseModal();
    }
  };

  function handleCreateTypeBot() {
    createForm.mutate({
      userId: userID,
      folderId: selectedFolder ? selectedFolder : null,
    });
  }

  function handleOpenForm(data) {
    navigate(
      `/dashboard/${userID}/workspacetool/${
        selectedFolder ? selectedFolder + "/" : ""
      }flow/${data._id}`
    );
  }

  return (
    <div className={styles.createTypeBotContainer}>
      <div
        className={styles.createTypeBot}
        onClick={() => handleCreateTypeBot()}
      >
        <div>
          <img src={plus_icon} />
        </div>
        <p>Create a typebot</p>
      </div>
      {formsWithUserId.data?.data?.map((form) => (
        <div className={styles.forms} key={form._id}>
          <div className={styles.form_img}>
            <img src={delete_icon} onClick={() => handleOpenModal(form._id)} />
          </div>
          <p onClick={() => handleOpenForm(form)}>{form.formName}</p>
        </div>
      ))}
      {selectedFormId && (
        <ModalContent>
          <div className="modalContent">
            <h1>Are you sure you want to delete this Form?</h1>
            <div className="buttons">
              <button onClick={handleDeleteForm}>Done</button>
              <span></span>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        </ModalContent>
      )}
    </div>
  );
}

export default Forms;
