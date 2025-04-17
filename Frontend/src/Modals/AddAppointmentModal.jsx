import React from "react";
import "./AssignTestModal.css";
import { useState, useEffect } from "react";
import { useUser } from "/src/UserContext";
import "./AddAppointmentModal.css";
import { NotificationManager } from "react-notifications";

function AddAppointmentModal({ onClose, fetchAppointments }) {
  const [patientsData, setPatientsData] = useState([]);
  const { user: userData } = useUser();
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPatientsTable, setShowPatientsTable] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [selectedPatientId, setSelectedPatientId] = useState("");

  const getTherapistsPatients = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTherapist/therapist/${userData.nameid}`
      );
      if (!response.ok) {
        console.log("Failed to fetch patient data:", response.status);
      }
      const data = await response.json();
      console.log("Therapists patients:", data);

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

  const handleShowPatientsTable = () => {
    setShowPatientsTable(true);
  };

  const handleSelectPatient = (patientId) => {
    setSelectedPatientId(patientId);
    console.log("Selected patient ID:", patientId);
  };

  useEffect(() => {
    if (userData && userData.nameid) {
      getTherapistsPatients();
    }
  }, [userData]);

  useEffect(() => {
    const results = patientsData.filter(
      (patient) =>
        patient.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.givenName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        patient.surname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPatients(results);
  }, [searchTerm, patientsData]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleAddAppointment = async (patientId) => {
    const convertedDate = new Date(appointmentDate).toISOString();

    const appointmentData = {
      patientId: selectedPatientId,
      therapistId: userData.nameid,
      appointmentDate: convertedDate,
      startTime: startTime + ":00",
      endTime: endTime + ":00",
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Appointments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(appointmentData),
        }
      );
      if (!response.ok) {
        console.log("Failed to add appointment:", response.status);
        NotificationManager.error(response.validationsErrors[0], "Error");
      } else {
        NotificationManager.success(
          "Appointment added successfully",
          "Success"
        );
        fetchAppointments();
      }
      onClose();
    } catch (error) {
      console.error("Error adding appointment:", error);
      NotificationManager.error("Error adding appointment", "Error");
    }
  };

  const currentDate = new Date().toISOString().split('T')[0];

  return (
    <div className="modal-overlay assign-test-modal-container add-appointment-modal">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content modal-content-assign-test">
        <button
          className="close-button close-button-assign-test-modal"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="assign-test-modal-title">Patient list</h2>
        <div className="appointment-date-label">
          <label>Appointment Date:</label>
          <input
            type="date"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            min={currentDate}
            required
          />
        </div>
        <div className="appointment-date-label">
          <label>Start Time:</label>
          <input
            type="time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
        </div>
        <div className="appointment-date-label">
          <label>End Time:</label>
          <input
            type="time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <button
          className="button-view-patients-add-appointment"
          onClick={handleShowPatientsTable}
        >
          Choose patient
        </button>
        {showPatientsTable && (
          <div className="patients-table-add-appointment-modal">
            <table className="table-patients-add-appointment-modal">
              <thead>
                <tr>
                  <th style={{ paddingRight: "30px" }}>First Name</th>
                  <th style={{ paddingRight: "30px" }}>Last Name</th>
                  <th style={{ paddingRight: "30px" }}>Username</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient, index) => (
                  <tr
                    key={index}
                    onClick={() => handleSelectPatient(patient.id)}
                    className={
                      selectedPatientId === patient.id ? "selected" : ""
                    }
                  >
                    <td>{patient.givenName}</td>
                    <td>{patient.surname}</td>
                    <td>{patient.userName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        <button
          className="button-add-appointment"
          onClick={() => handleAddAppointment(selectedPatientId)}
        >
          Add
        </button>
      </div>
    </div>
  );
}

export default AddAppointmentModal;
