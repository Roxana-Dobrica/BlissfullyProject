import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "./UserContext";
import "./AddTherapistFeedbackModal.css";

function AddTherapistFeedbackModal({ onClose, onAdd }) {
  const { user } = useUser();
  const [patientTherapist, setPatientTherapist] = useState(null);
  const [formData, setFormData] = useState({
    TherapistId: "",
    UserId: "",
    FeedbackDate: "",
    Feedback: "",
  });

  const fetchPatientTherapist = async (patientId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTherapist/patient/${patientId}`
      );
      if (response.ok) {
        const data = await response.json();
        setPatientTherapist(data.therapistId);
        return data;
      } else {
        console.error("Failed to fetch patient therapist", response.status);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString();
    const updatedFormData = {
      TherapistId: patientTherapist,
      UserId: user.nameid,
      FeedbackDate: currentDate,
      Feedback: formData.Feedback,
    };
    onAdd(updatedFormData);
  };

  useEffect(() => {
    if (user && user.nameid) {
      fetchPatientTherapist(user.nameid);
    }
  }, [user]);

  return (
    <div className="modal-overlay modal-overlay-add-therapist-feedback">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content modal-content-add-therapist-feedback">
        <button
          className="close-button close-button-journaling"
          onClick={onClose}
        >
          ✖
        </button>
        <h2>Add Feedback</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Feedback
            <textarea name="Feedback" onChange={handleChange} />
          </label>
          <button className="btn-add-feedback" type="submit">
            Add feedback
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddTherapistFeedbackModal;
