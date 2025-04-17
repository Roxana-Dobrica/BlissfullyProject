import React, { useState } from "react";
import { useUser } from "./UserContext";
import { useEffect } from "react";
import "./AddResourceTherapistModal.css";
import "./Modal.css";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { fetchPatientResourcesByCategory } from "./PatientPageService";

function AddResourceTherapistModal({ onClose, onAdd, patientId, category }) {
  const [userData, setUserData] = useState(null);
  const { user } = useUser();

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && user && user.nameid) {
          fetchUserData(user.nameid);
        } else {
          console.error("Token or user data missing");
          return;
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, [user]);

  const [formData, setFormData] = useState({
    UserId: patientId,
    MaterialTitle: "",
    MaterialDescription: "",
    MaterialUrl: "",
    Category: 0,
    AddedByDoctorId: user.nameid,
    IsFavorite: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "Category" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Materials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        NotificationManager.success("Resource added successfully", "Success");
        const updatedResources = await fetchPatientResourcesByCategory(
          patientId,
          category
        );
        onAdd(updatedResources);
        onClose();
      } else {
        const responseData = await response.json(); 
        if (responseData && responseData.validationsErrors) {
          console.error(
            "Failed to add resource:",
            responseData.validationsErrors
          );
          NotificationManager.error(responseData.validationsErrors[0], "Error");
        }
      }
    } catch (error) {
      console.error("Error adding resource:", error);
    }
  };

  return (
    <div>
      <div className="modal-overlay">
        <div className="background" onClick={onClose}></div>
        <div className="modal-content modal-content-add-resource-therapist">
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
          <h2>Add resource</h2>
          <form onSubmit={handleSubmit}>
            <label>
              <p>Material Title:</p>
              <input
                type="text"
                name="MaterialTitle"
                value={formData.MaterialTitle}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>Material URL:</p>
              <input
                type="text"
                name="MaterialUrl"
                value={formData.MaterialUrl}
                onChange={handleChange}
              />
            </label>
            <label>
              <p>Material Description:</p>
              <textarea
                name="MaterialDescription"
                value={formData.MaterialDescription}
                onChange={handleChange}
              />
            </label>
            <label className="resource-category-label">
              <p>Category:</p>
              <select
                name="Category"
                value={formData.Category}
                onChange={handleChange}
              >
                <option value="0">Music</option>
                <option value="1">Video</option>
                <option value="2">Reading</option>
                <option value="3">Podcast</option>
              </select>
            </label>
            <div className="submit-modal-btn-container">
              <button
                className="submit-modal-btn submit-modal-add-resource-for-patient"
                type="submit"
              >
                Add Resource
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddResourceTherapistModal;
