import React from "react";
import TherapistFeedbacks from "./TherapistFeedbacks";
import PatientNotes from "./PatientNotes";
import "./PatientNotesFeedbacks.css";

function PatientNotesFeedbacks() {
  return (
    <div className="patient-notes-feedbacks">
      <h1 className="notes-feedbacks-patient-title">My notes & feedbacks</h1>
      <div className="patient-notes-feedbacks-top d-flex justify-content-center">
        <ul
          className="nav nav-pills mb-3 patient-nav-bar-notes-feedbacks"
          id="pills-tab"
          role="tablist"
        >
          <li className="nav-item" role="presentation">
            <button
              className="nav-link nav-link-notes-feedbacks active"
              id="pills-patient-notes-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-patient-notes"
              type="button"
              role="tab"
              aria-controls="pills-patient-notes"
              aria-selected="true"
            >
              Notes for you
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link nav-link-notes-feedbacks"
              id="pills-feedbacks-by-patient-tab"
              data-bs-toggle="pill"
              data-bs-target="#pills-feedbacks-by-patient"
              type="button"
              role="tab"
              aria-controls="pills-feedbacks-by-patient"
              aria-selected="false"
            >
              Feedbacks given by you
            </button>
          </li>
        </ul>
      </div>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-patient-notes"
          role="tabpanel"
          aria-labelledby="pills-patient-notes-tab"
          tabindex="0"
        >
          <PatientNotes />
        </div>
        <div
          className="tab-pane fade"
          id="pills-feedbacks-by-patient"
          role="tabpanel"
          aria-labelledby="pills-feedbacks-by-patient-tab"
          tabindex="0"
        >
          <TherapistFeedbacks />
        </div>
      </div>
    </div>
  );
}

export default PatientNotesFeedbacks;
