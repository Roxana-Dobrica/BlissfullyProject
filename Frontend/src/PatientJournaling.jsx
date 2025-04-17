import React from "react";
import { useState } from "react";
import JournalEntryModal from "./JournalEntryModal";
import "./PatientJournaling.css";
import { useUser } from "./UserContext";
import { useEffect } from "react";
import { NotificationContainer } from "react-notifications";
import ShowJournalEntryModal from "./ShowJournalEntryModal";

function PatientJournaling() {
  const [isJournalModalOpen, setIsJournalModalOpen] = useState(false);
  const [journalEntries, setJournalEntries] = useState([]);
  const [userData, setUserData] = useState(null);
  const [currentMonth, setCurrentMonth] = useState("");
  const [selectedJournalEntry, setSelectedJournalEntry] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [journalEntryToDelete, setJournalEntryToDelete] = useState(null);
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const { user } = useUser();

  const handleOpenJournalModal = () => {
    setIsJournalModalOpen(true);
  };

  const handleCloseJournalModal = () => {
    setIsJournalModalOpen(false);
    getUserJournalEntries();
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

  useEffect(() => {
    if (userData) {
      getUserJournalEntries();
    }
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth();
    setCurrentMonth(months[currentMonthIndex]);
  }, [userData]);

  const getUserJournalEntries = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/JournalEntries/patient/${userData.id}`
      );
      if (response.ok) {
        const data = await response.json();
        setJournalEntries(data.journalEntries);
      } else {
        console.error("Failed to fetch journal entries");
      }
    } catch (error) {
      console.error("Error fetching journal entries:", error);
    }
  };

  const handleDeleteJournalEntry = (journalEntryId) => {
    const journalEntryToDelete = journalEntries.find(
      (journalEntry) => journalEntry.journalEntryId === journalEntryId
    );
    setJournalEntryToDelete(journalEntryToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteEntry = async () => {
    if (!journalEntryToDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/JournalEntries/${
          journalEntryToDelete.journalEntryId
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            journalEntryId: journalEntryToDelete.journalEntryId,
          }),
        }
      );

      if (response.ok) {
        setJournalEntries((prevEntries) =>
          prevEntries.filter(
            (entry) =>
              entry.journalEntryId !== journalEntryToDelete.journalEntryId
          )
        );
        setIsDeleteModalOpen(false);
      } else {
        console.error("Failed to delete journal entry");
      }
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  };

  const handleCloseDeleteModal = () => {
    setJournalEntryToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const handleJournalEntryClick = (entry) => {
    setSelectedJournalEntry(entry);
  };

  const handleMonthButtonClick = (month) => {
    setCurrentMonth(month);
  };

  const handleCloseSelectedJournalEntry = () => {
    setSelectedJournalEntry(null);
  };

  const entriesByMonth =
    journalEntries && journalEntries.length > 0
      ? journalEntries.filter((entry) => {
          const entryDate = new Date(entry.entryDate);
          const entryMonth = entryDate.getMonth();
          return months[entryMonth] === currentMonth;
        })
      : [];

  const entriesSortedByDate = entriesByMonth.sort((a, b) => {
    const dateA = new Date(a.entryDate);
    const dateB = new Date(b.entryDate);
    return dateB - dateA;
  });

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const updateJournalEntries = (updatedEntries) => {
    setJournalEntries(updatedEntries);
  };

  const closeModalDeleteJournalEntry = () => {
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <NotificationContainer />
      <h2 className="title-patient-journaling">Hello!</h2>
      <h4 className="subtitle-patient-journaling">How it's going on?</h4>
      <div className="journal-entries-title">
        <p>My journal entries</p>
        <button
          className="add-journal-entry-btn"
          onClick={() => handleOpenJournalModal()}
        >
          Add new
          <img
            src="./images/Patient/add.png"
            alt="add-icon"
            className="add-icon-journaling"
          />
        </button>
      </div>
      <div className="journal-entries-months">
        {months.map((month, index) => (
          <button
            className={`journal-entries-month-btn ${
              month === currentMonth ? "current-month" : ""
            }`}
            key={index}
            onClick={() => handleMonthButtonClick(month)}
          >
            {month}
          </button>
        ))}
      </div>
      {isJournalModalOpen && (
        <JournalEntryModal
          onClose={handleCloseJournalModal}
          patientId={userData.id}
        />
      )}
      {selectedJournalEntry && (
        <ShowJournalEntryModal
          entry={selectedJournalEntry}
          onClose={handleCloseSelectedJournalEntry}
          updateJournalEntries={updateJournalEntries}
        />
      )}
      {entriesSortedByDate.length === 0 ? (
        <div className="no-journal-entries-message">
          <p>No journal entries found.</p>
        </div>
      ) : (
        <div className="journal-entries">
          {entriesSortedByDate.map((entry, index) => (
            <div
              className="journal-entry-patient"
              style={{
                backgroundImage: `url(./images/PatientJournaling/journal_${index %
                  10}.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "rgba(0, 0, 0, 0.1)",
              }}
              key={index}
              onClick={() => handleJournalEntryClick(entry)}
            >
              <div className="journal-entry-info">
                <h3>{entry.entryTitle}</h3>
                <p>Created at {formattedDate(entry.entryDate)}</p>
              </div>
              <button
                className="delete-journal-entry-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeleteJournalEntry(entry.journalEntryId);
                }}
              >
                ✖
              </button>
            </div>
          ))}
        </div>
      )}
      {isDeleteModalOpen && journalEntryToDelete && (
        <div className="modal-overlay modal-overlay-delete-feedback">
          <div
            className="background"
            onClick={closeModalDeleteJournalEntry}
          ></div>
          <div className="modal-content modal-content-delete-feedback">
            <h2>Delete Journal Entry</h2>
            <p>Are you sure you want to delete this journal entry?</p>
            <div className="delete-feedback-modal-buttons">
              <button
                className="cancel-delete-feedback"
                onClick={handleCloseDeleteModal}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-feedback"
                onClick={handleDeleteEntry}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientJournaling;
