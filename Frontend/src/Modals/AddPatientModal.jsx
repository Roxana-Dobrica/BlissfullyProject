import React, { useState } from "react";
import { useEffect } from "react";
import { useUser } from "../UserContext";
import "/src/Modals/AddPatientModal.css";

function AddPatientModal({ onClose }) {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userName, setUserName] = useState("");
  const [patientData, setPatientData] = useState(null);
  const [searchAttempted, setSearchAttempted] = useState(false);
  const [therapistPatients, setTherapistPatients] = useState([]);
  const [isPatientAssigned, setIsPatientAssigned] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user && user.nameid) {
      fetchUserData(user.nameid);
      fetchTherapistPatients(user.nameid);
    }
  }, [user]);

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        console.log("Success fetching user data:", userData);
        setUserData(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const fetchTherapistPatients = async (therapistId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTherapist/therapist/${therapistId}`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Therapist patients data:", data);
        const patients = data.patientsTherapists || [];
        console.log("Therapist patients:", patients);
        setTherapistPatients(patients);
      } else {
        console.error("Failed to fetch therapist patients");
      }
    } catch (error) {
      console.error("Error fetching therapist patients:", error);
    }
  };

  const getUserByUsername = async (username) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/Users/username/${userName}`
      );
      if (response.ok) {
        const patientData = await response.json();
        console.log("User found", patientData);
        setPatientData(patientData);

        const isAssigned = therapistPatients.some((patient) => {
          console.log(
            "Comparing patient.patientId:",
            patient.patientId,
            "with patientData.id:",
            patientData.id
          );
          return patient.patientId === patientData.id;
        });
        console.log("Is patient assigned:", isAssigned);
        setIsPatientAssigned(isAssigned);
      } else {
        setPatientData(null);
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      setPatientData(null);
      console.error("Error fetching user data:", error);
    }
  };

  const assignPatientToTherapist = async (patientId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/PatientTherapist`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            therapistId: userData.id,
            patientId: patientData.id,
          }),
        }
      );
      if (response.ok) {
        console.log("Patient assigned successfully!");
        onClose();
      } else {
        console.error("Failed to assign patient");
      }
    } catch (error) {
      console.error("Error assigning patient to doctor:", error);
    }
  };

  const handleSearchNewPatient = async (event) => {
    event.preventDefault();
    setSearchAttempted(true);
    getUserByUsername(userName);
  };

  const handleInputChange = (event) => {
    setUserName(event.target.value);
  };

  const handleAssignPatientToTherapist = async (event) => {
    event.preventDefault();
    if (patientData && patientData.id && !isPatientAssigned) {
      await assignPatientToTherapist(patientData.id);
    }
  };

  return (
    <div className="add-patient-modal">
      <div className="modal-overlay modal-overlay-add-patient">
        <div className="background" onClick={onClose}></div>
        <div className="modal-content modal-content-add-patient">
          <button className="close-button" onClick={onClose}>
            ✖
          </button>
          <h2>Add patient</h2>
          <form
            className="form-search search-add-patient"
            onSubmit={handleSearchNewPatient}
            role="search"
          >
            <div className="search-add-patient-top">
              <input
                className="form-control me-2 form-add-patient-search"
                type="text"
                placeholder="Search"
                aria-label="Search"
                value={userName}
                onChange={handleInputChange}
              />
              <button className="btn-search-new-patient" type="submit">
                Search
              </button>
            </div>
            {searchAttempted && patientData === null && <p>No user found</p>}
            {patientData && (
              <div className="add-patient-search-result-modal">
                <p className="patient-search-result-title">Result</p>
                <div className="result-found-patient-row">
                  <p className="result-found-patient-row-label">Username: </p>
                  <p className="result-found-patient-data">
                    {patientData.userName}
                  </p>
                </div>
                <div className="result-found-patient-row">
                  <p className="result-found-patient-row-label">Last name: </p>
                  <p className="result-found-patient-data">
                    {patientData.surname}
                  </p>
                </div>
                <div className="result-found-patient-row">
                  <p className="result-found-patient-row-label">First name: </p>
                  <p className="result-found-patient-data">
                    {patientData.givenName}
                  </p>
                </div>
                <div className="assign-patient-button">
                  {isPatientAssigned ? (
                    <button className="btn-assigned" disabled>
                      Assigned
                    </button>
                  ) : (
                    <button
                      className="add-patient-search-result-btn"
                      onClick={handleAssignPatientToTherapist}
                    >
                      Add patient
                    </button>
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddPatientModal;
