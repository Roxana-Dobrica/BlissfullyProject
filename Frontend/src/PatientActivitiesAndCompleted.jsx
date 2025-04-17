import React from "react";
import "./PatientNotesFeedbacks.css";
import PatientActivities from "./PatientActivities";
import ActivitiesPatientCompleted from "./ActivitiesPatientCompleted";

function PatientActivitiesAndCompleted() {
  return (
    <div className="patient-notes-feedbacks">
      <h1 className="notes-feedbacks-patient-title">My activities</h1>
      <div className="patient-notes-feedbacks-top d-flex justify-content-center">
        <ul
          className="nav nav-pills mb-3 patient-nav-bar-notes-feedbacks"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link nav-link-notes-feedbacks active"
              id="pills-activities-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-activities"
              type="button"
              role="tab"
              aria-controls="pills-activities"
              aria-selected="true"
            >
              All
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link nav-link-notes-feedbacks"
              id="pills-completed-activities-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-completed-activities"
              type="button"
              role="tab"
              aria-controls="pills-completed-activities"
              aria-selected="false"
            >
              Completed
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-activities"
          role="tabpanel"
          aria-labelledby="pills-activities-tab"
          tabindex="0"
        >
          <PatientActivities />
        </div>
        <div
          className="tab-pane fade"
          id="pills-completed-activities"
          role="tabpanel"
          aria-labelledby="pills-completed-activities-tab"
          tabindex="0"
        >
          <ActivitiesPatientCompleted />
        </div>
      </div>
    </div>
  );
}

export default PatientActivitiesAndCompleted;
