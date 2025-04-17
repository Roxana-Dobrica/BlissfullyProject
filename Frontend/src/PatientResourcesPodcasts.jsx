import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./PatientResourcesMusic.css";
import PatientRecommendedPodcasts from "./PatientRecommendedPodcasts";
import PatientAddedByMePodcasts from "./PatientAddedByMePodcasts";
import PatientFavoritePodcasts from "./PatientFavoritePodcasts";

function PatientResourcesPodcasts() {
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
            id="pills-podcasts-patient-recommended-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-podcasts-patient-recommended"
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
            id="pills-podcasts-added-by-patient-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-podcasts-added-by-patient"
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
            id="pills-podcasts-favorites-tab"
            data-bs-toggle="pill"
            data-bs-target="#pills-podcasts-favorites"
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
          id="pills-podcasts-patient-recommended"
          role="tabpanel"
          aria-labelledby="pills-podcasts-patient-recommended-tab"
          tabindex="0"
        >
          <PatientRecommendedPodcasts />
        </div>
        <div
          className="tab-pane fade"
          id="pills-podcasts-added-by-patient"
          role="tabpanel"
          aria-labelledby="pills-podcasts-added-by-patient-tab"
          tabindex="0"
        >
          <PatientAddedByMePodcasts />
        </div>
        <div
          className="tab-pane fade"
          id="pills-podcasts-favorites"
          role="tabpanel"
          aria-labelledby="pills-podcasts-favorites-tab"
          tabindex="0"
        >
          <PatientFavoritePodcasts />
        </div>
      </div>
    </div>
  );
}

export default PatientResourcesPodcasts;
