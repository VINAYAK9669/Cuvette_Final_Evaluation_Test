/* eslint-disable react/prop-types */
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { onCloseModal } from "../pages/modalSlice";

Modal.setAppElement("#root");

function ModalContent({ children }) {
  const { modalIsOpen } = useSelector((state) => state.modal);
  const disptach = useDispatch();
  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => disptach(onCloseModal())}
        contentLabel="Example Modal"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
          },
          content: {
            top: "30%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "rgba(24, 24, 27, 1)",
          },
        }}
      >
        {children}
      </Modal>
    </div>
  );
}

export default ModalContent;
