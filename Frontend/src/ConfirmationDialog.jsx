import React from "react";

const ConfirmationDialog = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="confirmation-dialog">
      <div className="confirmation-dialog-content">
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="confirmation-dialog-buttons">
          <button
            className="btn btn-primary btn-confirm-dialog"
            onClick={onConfirm}
          >
            Yes, delete
          </button>
          <button
            className="btn btn-secondary btn-cancel-dialog"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
