import React from "react";
import { Col, ListGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function PatientMenu() {
  const navigate = useNavigate();
  const location = useLocation();

  const changeTab = (hash) => {
    navigate(`/patient-dashboard${hash}`);
  };

  return (
    <div>
      <Col className="menu-patient menu-therapist">
        <ListGroup>
          <img
            src="/images/PatientMenu/blissfully_logo.png"
            alt="blissfully-logo"
            className="blissfully-logo logo-menu-patient d-none d-md-inline"
          />
          <ListGroup.Item
            action
            href="#dashboard"
            onClick={() => changeTab("#dashboard")}
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
            href="#journaling"
            onClick={() => changeTab("#journaling")}
          >
            <img
              src="/images/PatientDashboard/journal-patient.png"
              alt="journal-icon"
              className="image-patient-menu image-patient-menu-journal"
            />
            <span className="d-none d-md-inline">Journaling</span>
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#resources"
            onClick={() => changeTab("#resources")}
          >
            <img
              src="/images/PatientDashboard/materials-patient.png"
              alt="materials-icon"
              className="image-patient-menu"
            />
            <span className="d-none d-md-inline">Resources</span>
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#activities"
            onClick={() => changeTab("#activities")}
          >
            <img
              src="/images/PatientDashboard/activities-patient.png"
              alt="activities-icon"
              className="image-patient-menu"
            />
            <span className="d-none d-md-inline">Activities</span>
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#notesfeedbacks"
            onClick={() => changeTab("#notesfeedbacks")}
          >
            <img
              src="/images/PatientDashboard/pencil-patient.png"
              alt="pencil-icon"
              className="image-patient-menu"
            />
            <span className="d-none d-md-inline">Notes & Feedbacks</span>
          </ListGroup.Item>
          <ListGroup.Item
            action
            href="#testspatient"
            onClick={() => changeTab("#testspatient")}
          >
            <img
              src="/images/TherapistMenu/tests-menu.png"
              alt="pencil-icon"
              className="image-patient-menu"
            />
            <span className="d-none d-md-inline">Tests</span>
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
          <ListGroup.Item
            action
            href="#chatbot"
            onClick={() => changeTab("#chatbot")}
          >
            <img
              src="/images/PatientDashboard/bot.png"
              alt="chatbot-icon"
              className="image-patient-menu"
            />
            <span className="d-none d-md-inline">Chatbot</span>
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
    </div>
  );
}

export default PatientMenu;
