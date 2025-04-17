import React, { useState } from "react";
import "./AddResourceModal.css";
import { useUser } from "./UserContext";
import { useEffect } from "react";

function AddResourceModal({ onClose, onAdd, category }) {
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
    UserId: "",
    MaterialTitle: "",
    MaterialDescription: "",
    MaterialUrl: "",
    Category: category,
    AddedByDoctorId: null,
    IsFavorite: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (userData) {
      setFormData((prevState) => ({
        ...prevState,
        UserId: userData.id,
      }));
    }
  }, [userData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content modal-content-add-resource">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Add Resource</h2>
        {userData && (
          <form onSubmit={handleSubmit}>
            <label>
              Material Title:
              <input
                type="text"
                name="MaterialTitle"
                value={formData.MaterialTitle}
                onChange={handleChange}
              />
            </label>
            <label>
              Material URL:
              <input
                type="text"
                name="MaterialUrl"
                value={formData.MaterialUrl}
                onChange={handleChange}
              />
            </label>
            <label>
              Material Description:
              <textarea
                name="MaterialDescription"
                value={formData.MaterialDescription}
                onChange={handleChange}
              />
            </label>
            <button type="submit" className="add-resource-button-patient">
              Add Resource
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddResourceModal;
