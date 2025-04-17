import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import "./PatientDashboard.css";
import PatientDashboardd from "./PatientDashboardd.jsx";
import PatientSettings from "./PatientSettings.jsx";
import PatientResources from "./PatientResources.jsx";
import PatientJournaling from "./PatientJournaling.jsx";
import TherapistFeedbacks from "./TherapistFeedbacks.jsx";
import PatientNotesFeedbacks from "./PatientNotesFeedbacks.jsx";
import PatientBadges from "./PatientBadges.jsx";
import PatientActivitiesAndCompleted from "./PatientActivitiesAndCompleted.jsx";
import PatientProfile from "./PatientProfile.jsx";
import Chat from "./Chat/Chat.jsx";
import AllTestsPatient from "./Patient/Tests/AllTestsPatient.jsx";
import ChatBot from "./ChatBot/ChatBot.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function PatientDashboard() {
  const [activeTab, setActiveTab] = useState("#dashboard");

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.hash && location.hash !== activeTab) {
      setActiveTab(location.hash);
    }
  }, [location.hash, activeTab]);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Authentication/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    navigate(`/patient-dashboard${tab}`);
  };

  return (
    <div className="patient-dashboard">
      <Tab.Container
        id="list-group-tabs"
        defaultActiveKey="#dashboard"
        activeKey={activeTab}
        onSelect={(key) => handleTabChange(key)}
      >
        <Col className="menu-patient">
          <ListGroup>
            <img
              src="./images/PatientMenu/blissfully_logo.png"
              alt="blissfully-logo"
              className="blissfully-logo logo-menu-patient d-none d-md-inline"
            />
            <ListGroup.Item action href="#dashboard">
              <img
                src="./images/PatientDashboard/dashboard-patient.png"
                alt="dashboard-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Dashboard</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#profile">
              <img
                src="./images/PatientDashboard/profile-patient.png"
                alt="profile-icon"
                className="image-patient-menu image-patient-menu-profile"
              />
              <span className="d-none d-md-inline">Profile</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#journaling">
              <img
                src="./images/PatientDashboard/journal-patient.png"
                alt="journal-icon"
                className="image-patient-menu image-patient-menu-journal"
              />
              <span className="d-none d-md-inline">Journaling</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#resources">
              <img
                src="./images/PatientDashboard/materials-patient.png"
                alt="materials-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Resources</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#activities">
              <img
                src="./images/PatientDashboard/activities-patient.png"
                alt="activities-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Activities</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#notesfeedbacks">
              <img
                src="./images/PatientDashboard/pencil-patient.png"
                alt="pencil-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Notes & Feedbacks</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#testspatient">
              <img
                src="./images/TherapistMenu/tests-menu.png"
                alt="pencil-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Tests</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#settings">
              <img
                src="./images/PatientDashboard/settings-patient.png"
                alt="settings-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Settings</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#chatbot">
              <img
                src="./images/PatientDashboard/bot.png"
                alt="chatbot-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Chatbot</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#logout" onClick={handleLogout}>
              <img
                src="./images/PatientDashboard/logout-patient.png"
                alt="logout-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Logout</span>
            </ListGroup.Item>
          </ListGroup>
        </Col>

        <Tab.Content
          style={{
            width: "100%",
            overflowY: "scroll",
            height: "100vh",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <Tab.Pane eventKey="#dashboard">
            <PatientDashboardd onChangeTab={handleTabChange} />
          </Tab.Pane>
          <Tab.Pane eventKey="#profile">
            <PatientProfile onChangeTab={handleTabChange} />
          </Tab.Pane>
          <Tab.Pane eventKey="#journaling">
            <PatientJournaling />
          </Tab.Pane>
          <Tab.Pane eventKey="#resources">
            <PatientResources />
          </Tab.Pane>
          <Tab.Pane eventKey="#activities">
            <PatientActivitiesAndCompleted />
          </Tab.Pane>
          <Tab.Pane eventKey="#notesfeedbacks">
            <PatientNotesFeedbacks />
          </Tab.Pane>
          <Tab.Pane eventKey="#testspatient">
            <AllTestsPatient />
          </Tab.Pane>
          <Tab.Pane eventKey="#badges">
            <PatientBadges />
          </Tab.Pane>
          <Tab.Pane eventKey="#settings">
            <PatientSettings />
          </Tab.Pane>
          <Tab.Pane eventKey="#chatbot">
            <ChatBot />
          </Tab.Pane>
          <Tab.Pane eventKey="#logout">Tab pane logout</Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default PatientDashboard;
