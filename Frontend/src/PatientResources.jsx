import React, { useState, useEffect } from "react";
import "./PatientResources.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import PatientResourcesMusic from "./PatientResourcesMusic.jsx";
import PatientResourcesVideos from "./PatientResourcesVideos.jsx";
import PatientResourcesReading from "./PatientResourcesReading.jsx";
import PatientResourcesPodcasts from "./PatientResourcesPodcasts.jsx";
import Tab from "react-bootstrap/Tab";

function PatientResources() {
  const [activeTab, setActiveTab] = useState("#pills-music");

  return (
    <div className="patient-resources-container">
      <div className="patient-resources-title">
        <h2>Resources</h2>
      </div>
      <Tab.Container
        id="pills-tab"
        activeKey={activeTab}
        defaultActiveKey="#pills-music"
        onSelect={(key) => setActiveTab(key)}
      >
        <div className="patient-resources-options-section">
          <ul className="nav nav-pills mb-3 categories-navbar" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className={`nav-link ${
                  activeTab === "#pills-music" ? "active" : ""
                }`}
                id="pills-music-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-music"
                type="button"
                role="tab"
                aria-controls="pills-music"
                aria-selected={activeTab === "#pills-music"}
                onClick={() => setActiveTab("#pills-music")}
              >
                Music
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-videos-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-videos"
                type="button"
                role="tab"
                aria-controls="pills-videos"
                aria-selected={activeTab === "#pills-videos"}
                onClick={() => setActiveTab("#pills-videos")}
              >
                Videos
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-reading-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-reading"
                type="button"
                role="tab"
                aria-controls="pills-reading"
                aria-selected={activeTab === "#pills-reading"}
                onClick={() => setActiveTab("#pills-reading")}
              >
                Reading
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pills-podcasts-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-podcasts"
                type="button"
                role="tab"
                aria-controls="pills-podcasts"
                aria-selected={activeTab === "#pills-podcasts"}
                onClick={() => setActiveTab("#pills-podcasts")}
              >
                Podcasts
              </button>
            </li>
          </ul>
        </div>
        <div
          className="tab-content tab-content-resources"
          id="pills-tabContent"
        >
          <Tab.Pane eventKey="#pills-music">
            <PatientResourcesMusic />
          </Tab.Pane>
          <Tab.Pane eventKey="#pills-videos">
            <PatientResourcesVideos />
          </Tab.Pane>
          <Tab.Pane eventKey="#pills-reading">
            <PatientResourcesReading />
          </Tab.Pane>
          <Tab.Pane eventKey="#pills-podcasts">
            <PatientResourcesPodcasts />
          </Tab.Pane>
        </div>
      </Tab.Container>
    </div>
  );
}

export default PatientResources;
