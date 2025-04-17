import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import ListGroup from "react-bootstrap/ListGroup";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import Tab from "react-bootstrap/Tab";
import "./Therapist.css";
import TherapistPatientsTable from "./TherapistPatientsTable.jsx";
import "./PatientPage.css";

function PatientPageMenu() {
  const navigate = useNavigate();
  const handleTabChange = (key) => {
    if (key === "#link3") {
      navigate("/therapist#link3");
    }
  };

  return (
    <div className="menu-therapist-patient-page">
      <Tab.Container
        onSelect={handleTabChange}
        className="list-menu-therapist"
        id="list-group-tabs"
      >
        <ListGroup>
          <ListGroup.Item action href="#link1">
            <img
              src="/images/PatientDashboard/dashboard-patient.png"
              alt="dashboard-icon"
              className="image-patient-menu"
            />
            Dashboard
          </ListGroup.Item>
          <ListGroup.Item action href="#link2">
            <img
              src="/images/PatientDashboard/profile-patient.png"
              alt="profile-icon"
              className="image-patient-menu image-patient-menu-profile"
            />
            Profile
          </ListGroup.Item>
          <ListGroup.Item action href="#link3">
            <img
              src="/images/TherapistMenu/patients-menu.png"
              alt="patients-icon"
              className="image-patient-menu image-patient-menu-journal"
            />
            Patients
          </ListGroup.Item>
          <ListGroup.Item action href="#link4">
            <img
              src="/images/PatientDashboard/settings-patient.png"
              alt="settings-icon"
              className="image-patient-menu"
            />
            Settings
          </ListGroup.Item>
          <ListGroup.Item action href="#link5">
            <img
              src="/images/PatientDashboard/logout-patient.png"
              alt="logout-icon"
              className="image-patient-menu"
            />
            Logout
          </ListGroup.Item>
        </ListGroup>

        <Tab.Content style={{ width: "100%" }}>
          <Tab.Pane eventKey="#link1">Tab pane dashboard</Tab.Pane>
        </Tab.Content>
        <Tab.Pane eventKey="#link2">Tab pane profile</Tab.Pane>
        <Tab.Pane eventKey="#link3">
          <TherapistPatientsTable />
        </Tab.Pane>
        <Tab.Pane eventKey="#link4">Tab pane settings</Tab.Pane>
        <Tab.Pane eventKey="#link5">Tab pane logout</Tab.Pane>
      </Tab.Container>
    </div>
  );
}

export default PatientPageMenu;
