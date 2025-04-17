import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function TherapistMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const changeTab = (hash) => {
    navigate(`/therapist${hash}`);
  };

  return (
    <Col className="menu-patient menu-therapist">
      <ListGroup>
        <img
          src="/images/PatientMenu/blissfully_logo.png"
          alt="blissfully-logo"
          className="blissfully-logo logo-menu-patient d-none d-md-block"
        />
        <ListGroup.Item
          action
          href="#link1"
          onClick={() => changeTab("#link1")}
        >
          <img
            src="/images/PatientDashboard/dashboard-patient.png"
            alt="dashboard-icon"
            className="image-patient-menu"
          />
          <span className="d-none d-md-inline">Dashboard</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#appointments"
          onClick={() => changeTab("#appointments")}
        >
          <img
            src="/images/TherapistMenu/schedule.png"
            alt="dashboard-icon"
            className="image-patient-menu"
          />
          <span className="d-none d-md-inline">Appointments</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#profile"
          onClick={() => changeTab("#profile")}
        >
          <img
            src="/images/PatientDashboard/profile-patient.png"
            alt="profile-icon"
            className="image-patient-menu image-patient-menu-profile"
          />
          <span className="d-none d-md-inline">Profile</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link3"
          onClick={() => changeTab("#link3")}
        >
          <img
            src="/images/TherapistMenu/patients-menu.png"
            alt="patients-icon"
            className="image-patient-menu image-patient-menu-journal"
          />
          <span className="d-none d-md-inline">Patients</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link4"
          onClick={() => changeTab("#link4")}
        >
          <img
            src="/images/TherapistMenu/tests-menu.png"
            alt="tests-icon"
            className="image-patient-menu"
          />
          <span className="d-none d-md-inline">Tests</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#notesTherapist"
          onClick={() => changeTab("#notesTherapist")}
        >
          <img
            src="/images/TherapistMenu/notes.png"
            alt="notes-icon"
            className="image-patient-menu"
          />
          <span className="d-none d-md-inline">Notes</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#chatbot"
          onClick={() => changeTab("#notes")}
        >
          <img
            src="/images/PatientDashboard/bot.png"
            alt="chatbot-icon"
            className="image-patient-menu"
          />
          <span className="d-none d-md-inline">Chatbot</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#link8"
          onClick={() => changeTab("#link8")}
        >
          <img
            src="/images/TherapistMenu/news.png"
            alt="news-icon"
            className="image-patient-menu"
          />
          <span className="d-none d-md-inline">News</span>
        </ListGroup.Item>
        <ListGroup.Item
          action
          href="#settings"
          onClick={() => changeTab("#settings")}
        >
          <img
            src="/images/PatientDashboard/settings-patient.png"
            alt="settings-icon"
            className="image-patient-menu"
          />
          <span className="d-none d-md-inline">Settings</span>
        </ListGroup.Item>
        <ListGroup.Item action href="#logout">
          <img
            src="/images/PatientDashboard/logout-patient.png"
            alt="logout-icon"
            className="image-patient-menu"
          />
          <span className="d-none d-md-inline">Logout</span>
        </ListGroup.Item>
      </ListGroup>
    </Col>
  );
}

export default TherapistMenu;
