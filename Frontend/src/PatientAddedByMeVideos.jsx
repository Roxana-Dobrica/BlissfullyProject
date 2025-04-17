import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./PatientRecommendedMusic.css";
import AddResourceModal from "./AddResourceModal";
import { RiHeart3Fill, RiHeart3Line } from "react-icons/ri";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { useUser } from "./UserContext";

function PatientAddedByMeVideos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [userData, setUserData] = useState(null);
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && user && user.nameid) {
          fetchUserData(user.nameid);
        } else {
          console.error("Token or user data missing");
          return;
        }
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
  }, [user]);

  const fetchResources = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Materials/patient/${
          userData.id
        }/type/${1}`
      );
      if (response.ok) {
        const data = await response.json();
        setResources(data.materials);
      } else {
        console.error("Failed to fetch resources");
      }
    } catch (error) {
      console.error("Error fetching resources:", error);
    }
  };

  const handleAddResource = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/materials`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        }
      );
      if (response.ok) {
        fetchResources();
        NotificationManager.success("Resource added successfully!", "Success");
        handleCloseModal();
      } else {
        console.error("Failed to add resource");
        NotificationManager.error("Failed to add resource", "Error");
      }
    } catch (error) {
      console.error("Error:", error);
      NotificationManager.error("Failed to add resource", "Error");
    }
  };

  const handleToggleFavorite = async (resource) => {
    const updatedResource = { ...resource, isFavorite: !resource.isFavorite };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Materials/${
          resource.materialId
        }`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedResource),
        }
      );

      if (response.ok) {
        setResources((prevResources) =>
          prevResources.map((r) =>
            r.materialId === resource.materialId ? updatedResource : r
          )
        );
      } else {
        console.error("Failed to update resource", response);
      }
    } catch (error) {
      console.error("Error updating resource:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchResources();
    }
  }, [userData]);

  const handleDeleteResource = async (materialId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/Materials/${materialId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ materialId: materialId }),
        }
      );
      if (response.ok) {
        setResources((prevEntries) =>
          prevEntries.filter((resource) => resource.materialId !== materialId)
        );
      } else {
        console.error("Failed to delete resource");
      }
    } catch (error) {
      console.error("Error deleting resource:", error);
    }
  };

  const filteredResources = resources
    ? resources.filter((resource) => {
        return resource.materialTitle
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      })
    : [];

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="patient-resources-added-by-me-music-container">
      <NotificationContainer />
      <div className="container-search-bar">
        <form className="form-search form-search-resources" role="search">
          <input
            className="form-control me-2 form-resources-search"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <button
        className="add-resource-by-me-btn"
        onClick={() => handleOpenModal(0)}
      >
        Add new
        <img
          src="./images/Patient/add.png"
          alt="add-icon"
          className="add-icon-journaling"
        />
      </button>

      <div className="cards-section-patient cards-section-patient-added-by-me">
        {isModalOpen && (
          <AddResourceModal
            onClose={handleCloseModal}
            onAdd={handleAddResource}
            category={1}
          />
        )}
        {filteredResources &&
          filteredResources.length > 0 &&
          filteredResources
            .filter(
              (filteredResources) => filteredResources.addedByDoctorId === null
            )
            .map((resource, index) => (
              <div className="card card-resources" key={resource.materialId}>
                <button
                  className="delete-resource-btn"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (
                      window.confirm(
                        "Are you sure you want to delete this music?"
                      )
                    ) {
                      handleDeleteResource(resource.materialId);
                    }
                  }}
                >
                  ✖
                </button>
                <img
                  src={`./images/Resources/resource${(index % 16) + 1}.jpg`}
                  className="card-img-top card-img-patient-resources"
                  alt="cover"
                />
                <div className="card-body">
                  <h5 className="card-title card-resource-title">
                    {resource.materialTitle}
                  </h5>
                  <p className="card-text card-resource-description">
                    {resource.materialDescription}
                  </p>
                  <div className="bottom-card-section">
                    <div
                      className="heart-icon-favorites"
                      onClick={() => handleToggleFavorite(resource)}
                    >
                      {resource.isFavorite ? (
                        <RiHeart3Fill color="red" />
                      ) : (
                        <RiHeart3Line color="red" />
                      )}
                    </div>
                    <a
                      href={resource.materialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="play-button-container">
                        <p>Play</p>
                        <img
                          src="./images/PatientResources/play-button.png"
                          alt="Play"
                          className="play-icon-music"
                        />
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default PatientAddedByMeVideos;
