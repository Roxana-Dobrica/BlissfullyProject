import "react-calendar/dist/Calendar.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "./TherapistPatientsTable.css";
import AddPatientModal from "./Modals/AddPatientModal.jsx";
import { useState } from "react";
import { useEffect } from "react";
import { useUser } from "./UserContext";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PatientPage from "./PatientPage.jsx";

function TherapistPatientsTable() {
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const { user } = useUser();
  const [patientsData, setPatientsData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState(null);

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

  useEffect(() => {
    if (userData) {
      getTherapistsPatients();
    }
  }, [userData]);

  const getTherapistsPatients = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTherapist/therapist/${userData.id}`
      );
      if (!response.ok) {
        console.log("Failed to fetch patient data:", response.status);
      }
      const data = await response.json();
      if (!data.patientsTherapists) {
        return;
      }
      const patientsDataPromises = data.patientsTherapists.map(
        async (patientTherapist) => {
          const patientId = patientTherapist.patientId;
          const patientResponse = await fetch(
            `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${patientId}`
          );
          if (!patientResponse.ok) {
            console.log(
              `Failed to fetch data for patient with ID ${patientId}:`,
              patientResponse.status
            );
            return null;
          }
          return await patientResponse.json();
        }
      );
      const patientsData = await Promise.all(patientsDataPromises);
      console.log("Patients data:", patientsData);
      setPatientsData(patientsData);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const handleOpenAddPatientModal = () => {
    setIsAddPatientModalOpen(true);
  };

  const handleCloseAddPatientModal = () => {
    setIsAddPatientModalOpen(false);
  };

  const filteredPatientsData = patientsData.filter(
    (patient) =>
      patient.userName.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.givenName.toLowerCase().includes(searchValue.toLowerCase()) ||
      patient.surname.toLowerCase().includes(searchValue.toLowerCase())
  );

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleDeletePatient = (patientId) => {
    const patientToDelete = patientsData.find((patient) => patient.id === patientId);
    if (patientToDelete) {
      setPatientToDelete(patientToDelete);
      setIsDeleteModalOpen(true);
    } else {
      console.error(`Patient with ID ${patientId} not found in patientsData.`);
    }
  };

  const handleCloseDeletePatient = () => {
    setPatientToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeletePatient = async () => {
    if (!patientToDelete) return;
  
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/PatientTherapist/patient/${patientToDelete.id}/therapist/${userData.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: patientToDelete.id,
            therapistId: userData.id,
          }),
        }
      );
  
      if (response.ok) {
        setPatientsData((prevPatients) =>
          prevPatients.filter((patient) => patient.id !== patientToDelete.id)
        );
        setIsDeleteModalOpen(false);
      } else {
        console.error("Failed to delete patient:", response.status);
      }
    } catch (error) {
      console.error("Error deleting patient:", error);
    }
  };

  return (
    <div className="therapist-patient-table">
      <div className="top-section-therapist-patient-list">
        <h1 className="therapist-patient-list-title">Patient List</h1>
        <button
          className="btn-add-patient"
          onClick={() => handleOpenAddPatientModal()}
        >
          Add Patient
          <img
            src="./images/Patient/add.png"
            alt="add-icon"
            className="add-icon-journaling"
          />
        </button>
        {isAddPatientModalOpen && (
          <AddPatientModal onClose={handleCloseAddPatientModal} />
        )}
      </div>
      <div className="container-search-bar container-search-bar-patients">
        <form className="form-search search-patient-list" role="search">
          <input
            className="form-control me-2 form-resources-search"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <div className="container-therapist-patients-table">
        <table className="table table-therapist-patients">
          <thead>
            <tr>
              <th scope="col">No.</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {filteredPatientsData.length === 0 ? (
              <tr>
                <td colSpan="6">No patients</td>
              </tr>
            ) : (
              filteredPatientsData.map((patient, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{patient.givenName}</td>
                  <td>{patient.surname}</td>
                  <td>{patient.userName}</td>
                  <td>{patient.email}</td>
                  <td>
                    <div className="all-tests-therapist-buttons-container">
                      <Link
                        to={`/patient/${patient.id}`}
                        className="view-patient-btn"
                      >
                        View
                      </Link>
                      <button
                        className="delete-test-table-button"
                        onClick={() => handleDeletePatient(patient.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {isDeleteModalOpen && patientToDelete && (
        <div className="modal-overlay modal-overlay-delete-feedback">
          <div
            className="background"
            onClick={handleCloseDeletePatient}
          ></div>
          <div className="modal-content modal-content-delete-feedback">
            <h2>Delete Patient</h2>
            <p>Are you sure you want to delete this patient?</p>
            <div className="delete-feedback-modal-buttons">
              <button
                className="cancel-delete-feedback"
                onClick={handleCloseDeletePatient}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-feedback"
                onClick={confirmDeletePatient}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TherapistPatientsTable;
