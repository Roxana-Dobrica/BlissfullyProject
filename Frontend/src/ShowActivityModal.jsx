import React from "react";
import "./ShowActivityModal.css";

function ShowActivityModal({ activity, onClose }) {
  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="show-activity-container">
      <div className="modal-overlay">
        <div className="background" onClick={onClose}></div>
        <div className="modal-content modal-content-selected-activity">
          <div>
            <button
              className="close-button close-button-selected-activity"
              onClick={onClose}
            >
              ✖
            </button>
          </div>
          <div className="selected-activity-info">
            <div className="selected-activity-image">
              <img src="./images/Patient/activity-icon.png" alt="activity" />
            </div>
            <div className="selected-activity-title">
              {activity.activityTitle}
            </div>
            <div className="selected-activity-description">
              {activity.activityDescription}
            </div>
            <div className="selected-activity-due-date">
              Due date: {formattedDate(activity.activityDueDate)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowActivityModal;
