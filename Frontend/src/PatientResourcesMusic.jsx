import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./PatientResourcesMusic.css";
import PatientRecommendedMusic from "./PatientRecommendedMusic.jsx";
import PatientAddedByMeMusic from "./PatientAddedByMeMusic.jsx";
import PatientFavoriteMusic from "./PatientFavoriteMusic.jsx";

function PatientResourcesMusic() {
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
            id="pills-music-patient-recommended-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-music-patient-recommended"
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
            id="pills-music-added-by-patient-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-music-added-by-patient"
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
            id="pills-music-favorites-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-music-favorites"
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
          id="pills-music-patient-recommended"
          role="tabpanel"
          aria-labelledby="pills-music-patient-recommended-tab"
          tabIndex="0"
        >
          <PatientRecommendedMusic />
        </div>
        <div
          className="tab-pane fade"
          id="pills-music-added-by-patient"
          role="tabpanel"
          aria-labelledby="pills-music-added-by-patient-tab"
          tabIndex="0"
        >
          <PatientAddedByMeMusic />
        </div>
        <div
          className="tab-pane fade"
          id="pills-music-favorites"
          role="tabpanel"
          aria-labelledby="pills-music-favorites-tab"
          tabIndex="0"
        >
          <PatientFavoriteMusic />
        </div>
      </div>
    </div>
  );
}

export default PatientResourcesMusic;
