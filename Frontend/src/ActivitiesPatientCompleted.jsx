import React from "react";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import "./PatientActivities.css";
import ShowActivityModal from "./ShowActivityModal";

function ActivitiesPatientCompleted() {
  const [userData, setUserData] = useState(null);
  const [activities, setActivities] = useState([]);
  const activitiesPerPage = 15;
  const { user } = useUser();
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedActivity, setSelectedActivity] = useState(null);

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

  useEffect(() => {
    if (userData) {
      getUserActivities();
    }
  }, [userData]);

  const getUserActivities = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Activities/patient/${
          userData.id
        }`
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
    if (!description) {
      return "";
    }

    if (description.length > wordsLength) {
      return description.slice(0, wordsLength) + "...";
    }
    return description;
  };

  const handleActivityClick = (activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseSelectedActivity = () => {
    setSelectedActivity(null);
  };

  const renderActivities = (pageNumber) => {
    const startIndex = (pageNumber - 1) * activitiesPerPage;
    const endIndex = startIndex + activitiesPerPage;
    const completedActivities = activities.filter(
      (activity) => activity.isActivityCompleted
    );
    return completedActivities
      .slice(startIndex, endIndex)
      .map((activity, index) => (
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
              className="activity-complete-checkbox"
              checked={activity.isActivityCompleted}
              onChange={() => {}}
            ></input>
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

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const goToPreviousPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const totalPages = Math.ceil(activities.length / activitiesPerPage);
  return (
    <div className="patient-activities-page">
      {selectedActivity && (
        <ShowActivityModal
          activity={selectedActivity}
          onClose={handleCloseSelectedActivity}
        />
      )}
      <div className="patient-activities-container">
        {activities && activities.length > 0 && renderActivities(pageNumber)}
      </div>
      <div className="pagination">
        <button onClick={goToPreviousPage} disabled={pageNumber === 1}>
          &lt;Prev
        </button>
        <button onClick={goToNextPage} disabled={pageNumber === totalPages}>
          Next&gt;
        </button>
      </div>
    </div>
  );
}
export default ActivitiesPatientCompleted;
