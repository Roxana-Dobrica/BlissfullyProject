import React from "react";
import { useState } from "react";
import { NotificationManager } from "react-notifications";
import { fetchPatientNotes } from "./PatientPageService";

function AddNoteTherapistModal({ onClose, onAdd, patientId }) {
  const [formData, setFormData] = useState({
    PatientId: patientId,
    NoteContent: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/notes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        console.log("Note added successfully");
        NotificationManager.success("Note added successfully", "Success");
        const updatedNotes = await fetchPatientNotes(patientId);
        onAdd(updatedNotes.notes);
        onClose();
      } else {
        const responseData = await response.json();
        if (responseData && responseData.validationsErrors) {
          console.error("Failed to add note:", responseData.validationsErrors);
          NotificationManager.error(responseData.validationsErrors[0], "Error");
        }
      }
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="modal-overlay .modal-overlay-patient-page">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content modal-content-note-patient-page">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Add note</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Note:</p>
            <textarea
              name="NoteContent"
              value={formData.NoteContent}
              onChange={handleChange}
            />
          </label>
          <div className="submit-modal-btn-container submit-modal-note-btn-container">
            <button
              className="submit-modal-btn submit-modal-patient-page"
              type="submit"
              style={{
                backgroundColor: "#2d325a",
                color: "white",
                borderRadius: "8px",
                padding: "7px 25px",
                fontWeight: 400,
                fontSize: "15px",
              }}
            >
              Add note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNoteTherapistModal;
