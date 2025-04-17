import React from "react";
import "./PatientBadges.css";

function PatientBadges() {
  return (
    <div>
      <h2 className="patient-badges-title">Your badges</h2>
      <div className="badge-container">
        <div className="badge-tooltip" data-tooltip="Badge 1: Description">
          <img
            className="patient-badge"
            src="/images/Badges/badge1.png"
            alt="badge1"
          />
        </div>
        <div className="badge-tooltip" data-tooltip="Badge 2: Description">
          <img
            className="patient-badge"
            src="/images/Badges/badge2.png"
            alt="badge2"
          />
        </div>
        <div className="badge-tooltip" data-tooltip="Badge 3: Description">
          <img
            className="patient-badge"
            src="/images/Badges/badge3.png"
            alt="badge3"
          />
        </div>
        <div className="badge-tooltip" data-tooltip="Badge 4: Description">
          <img
            className="patient-badge"
            src="/images/Badges/badge4.png"
            alt="badge4"
          />
        </div>
        <div className="badge-tooltip" data-tooltip="Badge 5: Description">
          <img
            className="patient-badge"
            src="/images/Badges/badge5.png"
            alt="badge5"
          />
        </div>
      </div>
    </div>
  );
}

export default PatientBadges;
