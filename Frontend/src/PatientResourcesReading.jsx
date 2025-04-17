import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./PatientResourcesMusic.css";
import PatientRecommendedReading from "./PatientRecommendedReading";
import PatientAddedByMeReading from "./PatientAddedByMeReading";
import PatientFavoriteReading from "./PatientFavoriteReading";

function PatientResourcesReading() {
  return (
    <div className="patient-resources-music-container">
      <ul
        className="nav nav-pills mb-3 music-patient-resources-navbar"
        id="pills-tab"
        role="tablist"
      >
        <li
          className="nav-item nav-item-patient-resources-music"
          role="presentation"
        >
          <div
            className="nav-link active"
            id="pills-reading-patient-recommended-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-reading-patient-recommended"
            role="tab"
            aria-controls="pills-music-patient-recommended"
            aria-selected="true"
          >
            Recommendations
          </div>
        </li>
        <li
          className="nav-item nav-item-patient-resources-music"
          role="presentation"
        >
          <div
            className="nav-link"
            id="pills-reading-added-by-patient-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-reading-added-by-patient"
            role="tab"
            aria-controls="pills-music-added-by-patient"
            aria-selected="false"
          >
            Added by me
          </div>
        </li>
        <li
          className="nav-item nav-item-patient-resources-music"
          role="presentation"
        >
          <div
            className="nav-link"
            id="pills-reading-favorites-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-reading-favorites"
            role="tab"
            aria-controls="pills-music-patient-favorites"
            aria-selected="false"
          >
            Favorites
          </div>
        </li>
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-reading-patient-recommended"
          role="tabpanel"
          aria-labelledby="pills-reading-patient-recommended-tab"
          tabindex="0"
        >
          <PatientRecommendedReading />
        </div>
        <div
          className="tab-pane fade"
          id="pills-reading-added-by-patient"
          role="tabpanel"
          aria-labelledby="pills-reading-added-by-patient-tab"
          tabindex="0"
        >
          <PatientAddedByMeReading />
        </div>
        <div
          className="tab-pane fade"
          id="pills-reading-favorites"
          role="tabpanel"
          aria-labelledby="pills-reading-favorites-tab"
          tabindex="0"
        >
          <PatientFavoriteReading />
        </div>
      </div>
    </div>
  );
}

export default PatientResourcesReading;
