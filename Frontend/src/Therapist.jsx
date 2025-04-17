import { useState } from "react";
import "react-calendar/dist/Calendar.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import Col from "react-bootstrap/Col";
import ListGroup from "react-bootstrap/ListGroup";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import TherapistPatientsTable from "./TherapistPatientsTable.jsx";
import PatientSettings from "./PatientSettings.jsx";
import "./Therapist.css";
import AllTestsTherapist from "./Therapist/Tests/AllTestsTherapist.jsx";
import PatientProfile from "./PatientProfile.jsx";
import NewsPage from "./Therapist/News/NewsPage.jsx";
import ChatBot from "./ChatBot/ChatBot.jsx";
import TherapistDashboard from "./Therapist/Dashboard/TherapistDashboard.jsx";
import AppointmentsPage from "./Therapist/Appointments/AppointmentsPage.jsx";
import NotesTherapist from "./Therapist/Notes/NotesTherapist.jsx";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function Therapist() {
  const [activeTab, setActiveTab] = useState("#link1");

  const location = useLocation();
  const navigate = useNavigate();
  const [currentComponent, setCurrentComponent] = useState(
    <TherapistDashboard />
  );
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    if (location.hash && location.hash !== activeTab) {
      setActiveTab(location.hash);
    }
  }, [location.hash, activeTab]);

  const changeTab = (tabKey) => {
    setActiveTab(tabKey);
    navigate(`/therapist${tabKey}`);
  };

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

  return (
    <div className="patient-dashboard therapist-dashboard">
      <Tab.Container
        className="list-patient-dashboard"
        id="list-group-tabs"
        defaultActiveKey="#link1"
        activeKey={activeTab}
        onSelect={(key) => setActiveTab(key)}
      >
        <Col className="menu-patient menu-therapist">
          <ListGroup>
            <img
              src="./images/PatientMenu/blissfully_logo.png"
              alt="blissfully-logo"
              className="blissfully-logo logo-menu-patient d-none d-md-inline"
            />
            <ListGroup.Item
              action
              href="#link1"
              onClick={() => changeTab("#link1")}
            >
              <img
                src="./images/PatientDashboard/dashboard-patient.png"
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
                src="./images/TherapistMenu/schedule.png"
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
                src="./images/PatientDashboard/profile-patient.png"
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
                src="./images/TherapistMenu/patients-menu.png"
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
                src="./images/TherapistMenu/tests-menu.png"
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
                src="./images/TherapistMenu/notes.png"
                alt="tests-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Notes</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#chatbot">
              <img
                src="./images/PatientDashboard/bot.png"
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
                src="./images/TherapistMenu/news.png"
                alt="tests-icon"
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
                src="./images/PatientDashboard/settings-patient.png"
                alt="settings-icon"
                className="image-patient-menu"
              />
              <span className="d-none d-md-inline">Settings</span>
            </ListGroup.Item>
            <ListGroup.Item action href="#link6" onClick={handleLogout}>
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
          <Tab.Pane eventKey="#link1">
            <TherapistDashboard />
          </Tab.Pane>
          <Tab.Pane eventKey="#profile">
            <PatientProfile onChangeTab={handleTabChange} />
          </Tab.Pane>
          <Tab.Pane eventKey="#link3">
            <TherapistPatientsTable />
          </Tab.Pane>
          <Tab.Pane eventKey="#link4">
            {activeTab === "#link4" && (
              <AllTestsTherapist onViewTest={() => changeTab("#link8")} />
            )}
          </Tab.Pane>
          <Tab.Pane eventKey="#appointments">
            <AppointmentsPage />
          </Tab.Pane>
          <Tab.Pane eventKey="#settings">
            <PatientSettings />
          </Tab.Pane>
          <Tab.Pane eventKey="#link6">Tab pane logout</Tab.Pane>
          <Tab.Pane eventKey="#chatbot">
            <ChatBot />
          </Tab.Pane>
          <Tab.Pane eventKey="#link8">
            <NewsPage />
          </Tab.Pane>
          <Tab.Pane eventKey="#notesTherapist">
            <NotesTherapist />
          </Tab.Pane>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default Therapist;
