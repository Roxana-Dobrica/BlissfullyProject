import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./PatientResourcesMusic.css";
import PatientRecommendedVideos from "./PatientRecommendedVideos";
import PatientAddedByMeVideos from "./PatientAddedByMeVideos";
import PatientFavoriteVideos from "./PatientFavoriteVideos";

function PatientResourcesVideos() {
  return (
    <div className="patient-resources-music-container">
      <ul
        className="nav nav-pills mb-3 music-patient-resources-navbar"
        id="pills-tab"
        role="tablist"
      >
        <li
          className="nav-item nav-item-patient-resources-videos"
          role="presentation"
        >
          <div
            className="nav-link active"
            id="pills-videos-patient-recommended-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-videos-patient-recommended"
            role="tab"
            aria-controls="pills-videos-patient-recommended"
            aria-selected="true"
          >
            Recommendations
          </div>
        </li>
        <li
          className="nav-item nav-item-patient-resources-videos"
          role="presentation"
        >
          <div
            className="nav-link"
            id="pills-videos-added-by-patient-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-videos-added-by-patient"
            role="tab"
            aria-controls="pills-videos-added-by-patient"
            aria-selected="false"
          >
            Added by me
          </div>
        </li>
        <li
          className="nav-item nav-item-patient-resources-videos"
          role="presentation"
        >
          <div
            className="nav-link"
            id="pills-videos-favorites-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-videos-favorites"
            role="tab"
            aria-controls="pills-videos-patient-favorites"
            aria-selected="false"
          >
            Favorites
          </div>
        </li>
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div
          className="tab-pane fade show active"
          id="pills-videos-patient-recommended"
          role="tabpanel"
          aria-labelledby="pills-videos-patient-recommended-tab"
          tabindex="0"
        >
          <PatientRecommendedVideos />
        </div>
        <div
          className="tab-pane fade"
          id="pills-videos-added-by-patient"
          role="tabpanel"
          aria-labelledby="pills-videos-added-by-patient-tab"
          tabindex="0"
        >
          <PatientAddedByMeVideos />
        </div>
        <div
          className="tab-pane fade"
          id="pills-videos-favorites"
          role="tabpanel"
          aria-labelledby="pills-videos-favorites-tab"
          tabindex="0"
        >
          <PatientFavoriteVideos />
        </div>
      </div>
    </div>
  );
}

export default PatientResourcesVideos;
