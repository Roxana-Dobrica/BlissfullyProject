import React, { useState } from "react";

function AddItemTextModal({ onClose, onSubmit }) {
  const [text, setText] = useState("");

  const handleAddText = (e) => {
    e.preventDefault();
    onSubmit(text);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Add text</h2>
        <form onSubmit={handleAddText}>
          <label>
            <textarea
              name="TextTest"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>
          <div className="submit-modal-btn-container">
            <button className="submit-modal-btn submit-add-text-test-button" type="submit">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemTextModal;
