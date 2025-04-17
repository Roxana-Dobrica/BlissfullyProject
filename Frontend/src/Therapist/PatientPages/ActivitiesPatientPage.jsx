import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import TherapistMenu from "../../TherapistMenu";
import Tab from "react-bootstrap/Tab";
import "../../PatientDashboard.css";
import "./StylesPatientPage.css";
import { deleteActivity } from "../../PatientPageService";
import "./ActivitiesPatientPage.css";

function ActivitiesPatientPage() {
  const { patientId } = useParams();
  const [activities, setActivities] = useState([]);
  const activitiesPerPage = 15;
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isDeleteActivityModalOpen, setIsDeleteActivityModalOpen] = useState(
    false
  );
  const [activityToDelete, setActivityToDelete] = useState(null);
  const [selectedActivity, setSelectedActivity] = useState(null);

  const getUserActivities = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/Activities/patient/${patientId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.activities) {
          data.activities.sort(
            (a, b) =>
              new Date(b.activityDateAdded) - new Date(a.activityDateAdded)
          );
          setActivities(data.activities);
        } else {
          console.log("Activities data is missing or empty");
        }
      } else {
        console.error("Failed to fetch activities");
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const addedActivityInDays = (date) => {
    const newDate = new Date(date);
    const currentDate = new Date();
    const difference = currentDate.getTime() - newDate.getTime();
    const daysDifference = Math.round(difference / (1000 * 3600 * 24));

    return "Added " + daysDifference + " days ago";
  };

  const truncateActivityWords = (description, wordsLength) => {
    if (description && description.length > wordsLength) {
      return description.slice(0, wordsLength) + "...";
    }
    return description;
  };

  useEffect(() => {
    if (patientId) {
      getUserActivities();
    }
  }, [patientId]);

  const renderActivities = () => {
    return activities.map((activity, index) => (
      <div
        className={`activity-card ${
          index % 4 === 0
            ? "activity-card-blue"
            : index % 4 === 1
            ? "activity-card-green"
            : index % 4 === 2
            ? "activity-card-red"
            : "activity-card-yellow"
        }`}
        key={index}
        onClick={() => handleActivityClick(activity)}
      >
        <h3 className="activity-card-title">
          {truncateActivityWords(activity.activityTitle, 30)}
          <input
            type="checkbox"
            className="activity-complete-checkbox activity-complete-checkbox-therapist"
            checked={activity.isActivityCompleted}
            // disabled
          ></input>
          <button
            className="delete-activity-button delete-activity-button-style"
            onClick={(e) => handleDeleteActivityClick(e, activity.activityId)}
          >
            ✖
          </button>
        </h3>
        <div className="activity-card-description">
          {truncateActivityWords(activity.activityDescription, 62)}
        </div>
        <div className="activity-card-due-date">
          Due date: {formattedDate(activity.activityDueDate)}
        </div>
        <div className="activity-card-date-added">
          {addedActivityInDays(activity.activityDateAdded)}
        </div>
      </div>
    ));
  };

  const handleDeleteActivityClick = (e, activityId) => {
    e.stopPropagation(); 
    const activity = activities.find((act) => act.activityId === activityId);
    console.log(activity);
    setActivityToDelete(activity);
    setIsDeleteActivityModalOpen(true);
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  const confirmDeleteActivity = async () => {
    if (!activityToDelete) return;
    console.log(activityToDelete.activityId);
    const success = await deleteActivity(activityToDelete.activityId);
    if (success) {
      setActivities((prevActivities) =>
        prevActivities.filter(
          (activity) => activity.activityId !== activityToDelete.activityId
        )
      );
      setIsDeleteActivityModalOpen(false);
    }
  };

  const closeModalDeleteActivity = () => {
    setIsDeleteActivityModalOpen(false);
  };

  const closeSelectedActivityModal = () => {
    setSelectedActivity(null);
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
            <h1 className="patient-activities-page-therapist-title">
              Activities
            </h1>
          </div>
          <div className="patient-activities-container">
            {activities &&
              activities.length > 0 &&
              renderActivities(pageNumber)}
          </div>
          {selectedActivity && (
            <div className="modal-overlay">
              <div
                className="background"
                onClick={closeSelectedActivityModal}
              ></div>
              <div className="modal-content modal-content-selected-activity">
                <div>
                  <button
                    className="close-button close-button-selected-activity"
                    onClick={closeSelectedActivityModal}
                  >
                    ✖
                  </button>
                </div>
                <div className="selected-activity-info">
                  <div className="selected-activity-title">
                    {selectedActivity.activityTitle}
                  </div>
                  <div className="selected-activity-description">
                    {selectedActivity.activityDescription}
                  </div>
                  <div className="selected-activity-due-date">
                    Due date: {formattedDate(selectedActivity.activityDueDate)}
                  </div>
                </div>
              </div>
            </div>
          )}
          {isDeleteActivityModalOpen && activityToDelete && (
            <div className="modal-overlay modal-overlay-delete-feedback">
              <div
                className="background"
                onClick={closeModalDeleteActivity}
              ></div>
              <div className="modal-content modal-content-delete-feedback">
                <h2>Delete Activity</h2>
                <p>Are you sure you want to delete this activity?</p>
                <div className="delete-feedback-modal-buttons">
                  <button
                    className="cancel-delete-feedback"
                    onClick={closeModalDeleteActivity}
                  >
                    Cancel
                  </button>
                  <button
                    className="confirm-delete-feedback"
                    onClick={confirmDeleteActivity}
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

export default ActivitiesPatientPage;
