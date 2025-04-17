import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import TherapistMenu from "../../TherapistMenu";
import { useEffect, useState } from "react";

function FeedbacksPatientPage() {
  const { patientId } = useParams();
  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  useEffect(() => {
    if (patientId) {
      getPatientFeedbacks();
    }
  }, [patientId]);

  const getPatientFeedbacks = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/TherapistFeedbacks/patient/${patientId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.therapistFeedbacks && data.therapistFeedbacks.length > 0) {
          data.therapistFeedbacks.sort(
            (a, b) => new Date(b.feedbackDate) - new Date(a.feedbackDate)
          );
          setFeedbacks(data.therapistFeedbacks);
        } else {
          setFeedbacks([]);
        }
      } else {
        console.error("Failed to fetch feedbacks");
      }
    } catch (error) {
      console.error("Error fetching feedbacks:", error);
    }
  };

  const truncateFeedback = (feedback, wordsLength) => {
    if (feedback.length > wordsLength) {
      return feedback.slice(0, wordsLength) + "...";
    }
    return feedback;
  };

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const renderFeedbacks = () => {
    return feedbacks.map((feedback, index) => (
      <div
        key={index}
        className="therapist-feedback-patient"
        onClick={() => handleFeedbackClick(feedback)}
      >
        <div className="therapist-feedback-content-patient therapist-feedback-content-patient-see-all">
          {truncateFeedback(feedback.feedback, 100)}
        </div>
        <div className="therapist-feedback-date-patient">
          Added on: {formattedDate(feedback.feedbackDate)}
        </div>
      </div>
    ));
  };

  const handleFeedbackClick = (feedback) => {
    setSelectedFeedback(feedback);
  };

  const closeSelectedFeedbackModal = () => {
    setSelectedFeedback(null);
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
              Feedbacks
            </h1>
          </div>
          <div className="patient-activities-container">
            {feedbacks.length > 0 ? (
              <div className="therapist-feedbacks-container">
                {feedbacks && feedbacks.length > 0 && renderFeedbacks()}
              </div>
            ) : (
              <div>No feedbacks available.</div>
            )}
          </div>
          {selectedFeedback && (
            <div className="modal-overlay">
              <div
                className="background"
                onClick={closeSelectedFeedbackModal}
              ></div>
              <div className="modal-content modal-content-selected-activity">
                <div>
                  <button
                    className="close-button close-button-selected-activity"
                    onClick={closeSelectedFeedbackModal}
                  >
                    ✖
                  </button>
                </div>
                <div className="selected-activity-info">
                  <div className="selected-activity-description">
                    {selectedFeedback.feedback}
                  </div>
                  <div className="selected-activity-due-date">
                    Date: {formattedDate(selectedFeedback.feedbackDate)}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default FeedbacksPatientPage;
