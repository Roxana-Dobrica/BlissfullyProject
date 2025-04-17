import React from "react";
import "./AssignTestModal.css";
import { useState, useEffect } from "react";
import { useUser } from "/src/UserContext";

function AssignTestModal({ onClose, testId }) {
  const [patientsData, setPatientsData] = useState([]);
  const { user: userData } = useUser();
  const [assignedPatients, setAssignedPatients] = useState([]);
  const [assignedTests, setAssignedTests] = useState({});
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const assignTestToPatient = async (patientId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/PatientTestAssignments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: patientId,
            testId: testId,
          }),
        }
      );
      if (response.ok) {
        setAssignedPatients([...assignedPatients, patientId]);
        setAssignedTests({ ...assignedTests, [patientId]: true });
        console.log("Test assigned to patient");
      }
    } catch (error) {
      console.error("Error assigning test to patient:", error);
    }
  };

  const unassignTestFromPatient = async (patientId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTestAssignments/patient/${patientId}/test/${testId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: patientId,
            testId: testId,
          }),
        }
      );
      if (response.ok) {
        const updatedAssignedPatients = assignedPatients.filter(
          (assignedPatient) => assignedPatient !== patientId
        );
        setAssignedPatients(updatedAssignedPatients);
        setAssignedTests({
          ...assignedTests,
          [patientId]: false,
        });
        console.log("Test unassigned from patient");
      }
    } catch (error) {
      console.error("Error unassigning test from patient:", error);
    }
  };

  const checkAssignedTestsForPatient = async (patientId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTestAssignments/patient/${patientId}`
      );
      if (response.ok) {
        const data = await response.json();
        const isAssigned = data.patientTestAssignments.some(
          (assignment) => assignment.testId === testId
        );
        setAssignedTests((prev) => ({
          ...prev,
          [patientId]: isAssigned,
        }));
      }
    } catch (error) {
      console.error("Error fetching assigned tests for patient:", error);
      return [];
    }
  };

  useEffect(() => {
    if (userData && userData.nameid) {
      getTherapistsPatients();
    }
  }, [userData]);

  useEffect(() => {
    patientsData.forEach((patient) => {
      checkAssignedTestsForPatient(patient.id);
    });
  }, [patientsData]);

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

  return (
    <div className="modal-overlay assign-test-modal-container">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content modal-content-assign-test">
        <button
          className="close-button close-button-assign-test-modal"
          onClick={onClose}
        >
          ✖
        </button>
        <h2 className="assign-test-modal-title">Patient list</h2>
        <div className="container-search-bar">
          <input
            className="form-control me-2 form-patient-search"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
        <div className="patients-table-assign-test-modal">
          <table className="table-patients-assign-test-modal">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient, index) => (
                <tr key={index}>
                  <td>{patient.surname}</td>
                  <td>{patient.givenName}</td>
                  <td>{patient.userName}</td>
                  <td>
                    {assignedTests[patient.id] ? (
                      <button
                        className="assign-test-modal-btn unassign-test-from-patient-btn"
                        onClick={() => unassignTestFromPatient(patient.id)}
                      >
                        Unassign
                      </button>
                    ) : (
                      <button
                        className="assign-test-modal-btn assign-test-to-patient-btn"
                        onClick={() => assignTestToPatient(patient.id)}
                      >
                        Assign
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AssignTestModal;
