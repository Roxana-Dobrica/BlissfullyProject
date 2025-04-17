import React, { useState } from "react";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { fetchPatientActivities } from "./PatientPageService";
import "./AddActivityTherapistModal.css";

function AddActivityTherapistModal({ onClose, onAdd, patientId }) {
  const [formData, setFormData] = useState({
    UserId: patientId,
    ActivityTitle: "",
    ActivityDescription: "",
    ActivityDueDate: "",
    isActivityCompleted: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const convertedDate = new Date(formData.ActivityDueDate).toISOString();

      const formattedData = {
        ...formData,
        ActivityDueDate: convertedDate,
      };

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/activities`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );
      if (response.ok) {
        NotificationManager.success("Activity added successfully", "Success");
        const updatedActivities = await fetchPatientActivities(patientId);
        onAdd(updatedActivities.activities);
        onClose();
      } else {
        const responseData = await response.json();
        if (responseData && responseData.validationsErrors) {
          console.error(
            "Failed to add activity:",
            responseData.validationsErrors
          );
          NotificationManager.error(responseData.validationsErrors[0], "Error");
        }
      }
    } catch (error) {
      console.error("Error adding activity:", error);
    }
  };

  function getCurrentDate() {
    const date = new Date();
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="modal-overlay modal-overlay-patient-page">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content modal-add-activity-for-patient">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Add activity</h2>
        <form onSubmit={handleSubmit}>
          <label>
            <p>Activity title:</p>
            <input
              type="text"
              name="ActivityTitle"
              value={formData.ActivityTitle}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Activity description:</p>
            <textarea
              name="ActivityDescription"
              value={formData.ActivityDescription}
              onChange={handleChange}
            />
          </label>
          <label>
            <p>Due date:</p>
            <input
              type="date"
              name="ActivityDueDate"
              value={formData.ActivityDueDate}
              onChange={handleChange}
              min={getCurrentDate()}
            />
          </label>
          <div className="submit-modal-btn-container">
            <button
              className="submit-modal-btn submit-modal-patient-page submit-activity-for-patient"
              type="submit"
            >
              Add activity
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddActivityTherapistModal;
