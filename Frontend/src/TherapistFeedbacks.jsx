import React from "react";
import { useState } from "react";
import AddTherapistFeedbackModal from "./AddTherapistFeedbackModal";
import "./TherapistFeedbacks.css";
import { useEffect } from "react";
import { useUser } from "./UserContext";

function TherapistFeedbacks({ onClose }) {
  const [
    isTherapistFeedbackModalOpen,
    setIsTherapistFeedbackModalOpen,
  ] = useState(false);
  const [userData, setUserData] = useState(null);
  const [feedbacks, setFeedbacks] = useState([]);
  const { user } = useUser();
  const [pageNumber, setPageNumber] = useState(1);
  const feedbacksPerPage = 15;
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [
    isTherapistFeedbackContentModalOpen,
    setIsTherapistFeedbackContentModalOpen,
  ] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [feedbackToDelete, setFeedbackToDelete] = useState(null);

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
      getPatientFeedbacks();
    }
  }, [userData]);

  const handleOpenTherapistFeedbackModal = () => {
    setIsTherapistFeedbackModalOpen(true);
  };

  const handleCloseTherapistFeedbackModal = () => {
    setIsTherapistFeedbackModalOpen(false);
  };

  const getPatientFeedbacks = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/TherapistFeedbacks/patient/${userData.id}`
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

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const truncateFeedback = (feedback, wordsLength) => {
    if (feedback.length > wordsLength) {
      return feedback.slice(0, wordsLength) + "...";
    }
    return feedback;
  };

  const handleAddTherapistFeedback = async (formData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/TherapistFeedbacks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formData }),
        }
      );
      if (response.ok) {
        getPatientFeedbacks();
        handleCloseTherapistFeedbackModal();
      } else {
        console.error("Failed to add feedback");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleDeleteFeedback = (therapistFeedbackId) => {
    const feedbackToDelete = feedbacks.find(
      (feedback) => feedback.therapistFeedbackId === therapistFeedbackId
    );
    setFeedbackToDelete(feedbackToDelete);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteFeedback = async () => {
    if (!feedbackToDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/TherapistFeedbacks/${
          feedbackToDelete.therapistFeedbackId
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            therapistFeedbackId: feedbackToDelete.therapistFeedbackId,
          }),
        }
      );
      if (response.ok) {
        setFeedbacks((prevEntries) =>
          prevEntries.filter(
            (feedback) =>
              feedback.therapistFeedbackId !==
              feedbackToDelete.therapistFeedbackId
          )
        );
        setIsDeleteModalOpen(false);
      } else {
        console.error("Failed to delete feedback");
      }
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  const closeModalDeleteFeedback = () => {
    setIsDeleteModalOpen(false);
  };

  const openFeedbackModal = (feedback) => {
    setSelectedFeedback(feedback);
    setIsTherapistFeedbackContentModalOpen(true);
  };

  const renderFeedbacks = (pageNumber) => {
    const startIndex = (pageNumber - 1) * feedbacksPerPage;
    const endIndex = startIndex + feedbacksPerPage;
    return feedbacks.slice(startIndex, endIndex).map((feedback, index) => (
      <div
        key={index}
        className="therapist-feedback-patient therapist-feedback-patient-account"
        onClick={() => openFeedbackModal(feedback)}
      >
        <div className="therapist-feedback-content-patient">
          {truncateFeedback(feedback.feedback, 100)}
        </div>
        <div className="therapist-feedback-date-patient">
          Added on: {formattedDate(feedback.feedbackDate)}
        </div>
        <button
          className="delete-feedback-patient-btn"
          onClick={(event) => {
            event.stopPropagation();
            handleDeleteFeedback(feedback.therapistFeedbackId);
          }}
        >
          ✖
        </button>
      </div>
    ));
  };

  const closeModalFeedbackContent = () => {
    setIsTherapistFeedbackContentModalOpen(false);
  };

  const goToNextPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber + 1);
  };

  const goToPreviousPage = () => {
    setPageNumber((prevPageNumber) => prevPageNumber - 1);
  };

  const totalPages = Math.ceil(feedbacks.length / feedbacksPerPage);

  return (
    <div className="therapist-feedbacks-patient">
      <button
        className="therapist-feedbacks-patient-btn"
        onClick={() => handleOpenTherapistFeedbackModal()}
      >
        Add new
        <img
          src="./images/Patient/add.png"
          alt="add-icon"
          className="add-icon-journaling"
        />
      </button>
      {isTherapistFeedbackModalOpen && (
        <AddTherapistFeedbackModal
          onClose={handleCloseTherapistFeedbackModal}
          onAdd={handleAddTherapistFeedback}
        />
      )}
      {isTherapistFeedbackContentModalOpen && selectedFeedback && (
        <div className="modal-overlay modal-overlay-journaling">
          <div className="background" onClick={closeModalFeedbackContent}></div>
          <div className="modal-content modal-content-journaling modal-content-therapist-feedback">
            <button
              className="close-button close-button-journaling"
              onClick={closeModalFeedbackContent}
            >
              ✖
            </button>
            <h2>Feedback Details</h2>
            <p className="feedback-content-description feedback-content-description-cnt">
              {selectedFeedback.feedback}
            </p>
            <p className="feedback-content-description">
              Added on: {formattedDate(selectedFeedback.feedbackDate)}
            </p>
          </div>
        </div>
      )}
      {isDeleteModalOpen && feedbackToDelete && (
        <div className="modal-overlay modal-overlay-delete-feedback">
          <div className="background" onClick={closeModalDeleteFeedback}></div>
          <div className="modal-content modal-content-delete-feedback">
            <h2>Delete Feedback</h2>
            <p>Are you sure you want to delete this feedback?</p>
            <div className="delete-feedback-modal-buttons">
              <button
                className="cancel-delete-feedback"
                onClick={closeModalDeleteFeedback}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-feedback"
                onClick={confirmDeleteFeedback}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
      {feedbacks.length > 0 ? (
        <div className="therapist-feedbacks-container">
          {feedbacks && feedbacks.length > 0 && renderFeedbacks(pageNumber)}
        </div>
      ) : (
        <div>No feedbacks available.</div>
      )}
      <div className="pagination">
        <button
          onClick={goToPreviousPage}
          disabled={pageNumber === 1}
          className="prev-button"
        >
          &lt;Prev
        </button>
        <button onClick={goToNextPage} disabled={pageNumber === totalPages}>
          Next&gt;
        </button>
      </div>
    </div>
  );
}

export default TherapistFeedbacks;
