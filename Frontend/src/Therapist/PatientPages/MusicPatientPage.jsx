import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import TherapistMenu from "../../TherapistMenu";
import { deleteResource } from "../../PatientPageService";

function MusicPatientPage() {
  const { patientId } = useParams();
  const [resources, setResources] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDeleteResourceModalOpen, setIsDeleteResourceModalOpen] = useState(
    false
  );
  const [resourceToDelete, setResourceToDelete] = useState(null);

  const fetchResources = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/Materials/patient/${patientId}/type/${0}`
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

  useEffect(() => {
    if (patientId) {
      fetchResources();
    }
  }, [patientId]);

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

  const handleDeleteResourceClick = (e, materialId) => {
    e.stopPropagation(); 
    const resource = resources.find((res) => res.materialId === materialId);
    console.log(resource);
    setResourceToDelete(resource);
    setIsDeleteResourceModalOpen(true);
  };

  const confirmDeleteResource = async () => {
    if (!resourceToDelete) return;
    console.log(resourceToDelete.materialId);
    const success = await deleteResource(resourceToDelete.materialId);
    if (success) {
      setResources((prevResources) =>
        prevResources.filter(
          (resource) => resource.materialId !== resourceToDelete.materialId
        )
      );
      setIsDeleteResourceModalOpen(false);
    }
  };

  const closeModalDeleteResource = () => {
    setIsDeleteResourceModalOpen(false);
  };

  return (
    <div className="patient-dashboard therapist-dashboard view-test-therapist-page">
      <Tab.Container className="list-patient-dashboard" id="list-group-tabs">
        <Tab.Content className="create-test-therapist-tab">
          <TherapistMenu />
        </Tab.Content>

        <Tab.Content className="tab-content-wrapper">
          <div className="patient-activities-page-header">
            <Link to={`/patient/${patientId}`}>
              <img
                src="/images/PatientResources/back.png"
                alt="arrow-back"
                className="arrow-back-icon"
              />
            </Link>
            <h1 className="patient-activities-page-therapist-title">Music</h1>
          </div>
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
          <div className="cards-section-patient cards-section-patient-added-by-me">
            {filteredResources &&
              filteredResources.length > 0 &&
              filteredResources
                .filter(
                  (filteredResources) =>
                    filteredResources.addedByDoctorId !== null
                )
                .map((resource, index) => (
                  <div
                    className="card card-resources"
                    key={resource.materialId}
                  >
                    <img
                      src={`/images/Resources/resource${(index % 16) + 1}.jpg`}
                      className="card-img-top card-img-patient-resources"
                      alt="cover"
                    />
                    <div className="card-body">
                      <button
                        className="delete-activity-button"
                        onClick={(e) =>
                          handleDeleteResourceClick(e, resource.materialId)
                        }
                      >
                        ✖
                      </button>
                      <h5 className="card-title card-resource-title">
                        {resource.materialTitle}
                      </h5>
                      <p className="card-text card-resource-description">
                        {resource.materialDescription}
                      </p>
                      <div className="bottom-card-section">
                        <a
                          href={resource.materialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="play-button-container">
                            <p>Play</p>
                            <img
                              src="/images/PatientResources/play-button.png"
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
          {isDeleteResourceModalOpen && resourceToDelete && (
            <div className="modal-overlay modal-overlay-delete-feedback">
              <div
                className="background"
                onClick={closeModalDeleteResource}
              ></div>
              <div className="modal-content modal-content-delete-feedback">
                <h2>Delete Resource</h2>
                <p>Are you sure you want to delete this resource?</p>
                <div className="delete-feedback-modal-buttons">
                  <button
                    className="cancel-delete-feedback"
                    onClick={closeModalDeleteResource}
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-delete-feedback"
                    onClick={confirmDeleteResource}
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default MusicPatientPage;
