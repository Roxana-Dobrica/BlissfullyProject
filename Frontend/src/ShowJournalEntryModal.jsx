import React from "react";
import "./ShowJournalEntryModal.css";
import { useEffect, useState } from "react";

function ShowJournalEntryModal({ entry, onClose, updateJournalEntries }) {
  const [journalEntries, setJournalEntries] = useState([]);

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleDeleteJournalEntry = async () => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this journal entry?"
    );
    if (!confirmation) {
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/JournalEntries/${
          entry.journalEntryId
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ journalEntryId: entry.journalEntryId }),
        }
      );
      if (response.ok) {
        onClose();
        updateJournalEntries((prevEntries) =>
          prevEntries.filter(
            (journal) => journal.journalEntryId !== entry.journalEntryId
          )
        );
      } else {
        console.error("Failed to delete journal entry");
      }
    } catch (error) {
      console.error("Error deleting journal entry:", error);
    }
  };

  return (
    <div className="show-journal-entry-container">
      <div className="modal-overlay">
        <div className="background" onClick={onClose}></div>
        <div className="modal-content show-journal-entry-modal-content">
          <div className="top-section-selected-journal-entry">
            <div className="selected-journal-entry-actions">
              <button
                className="delete-selected-journal-entry-btn"
                onClick={handleDeleteJournalEntry}
              >
                Delete
              </button>
            </div>
            <button
              className="close-button show-journal-entry-modal-close-button"
              onClick={onClose}
            >
              ✖
            </button>
          </div>
          <div className="selected-journal-entry-info">
            <div className="selected-journal-entry-date">
              {formattedDate(entry.entryDate)}
            </div>
            <div className="selected-journal-entry-title">
              {entry.entryTitle}
            </div>
            <div className="selected-journal-entry-content">
              {entry.entryContent}
            </div>
            <div className="selected-journal-entry-feelings">
              <div className="feeling-selected-journal-entry">
                {entry.feelings[0]}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowJournalEntryModal;
