/* eslint-disable react/prop-types */
const Modal = ({ isOpen, onClose }) => {
  if (!isOpen) {
    console.log("modal is close" + isOpen);
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>Modal Title</h3>
          <button className="close-button" onClick={onClose}>
            X
          </button>
        </div>
        <div className="modal-body">
          <p>Task Deleted.</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
