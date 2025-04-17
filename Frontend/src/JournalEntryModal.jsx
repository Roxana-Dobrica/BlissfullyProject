import React from "react";
import { useState } from "react";
import "./AddResourceModal.css";
import { NotificationManager } from "react-notifications";
import "./JournalEntryModal.css";
import { useUser } from "./UserContext";

function JournalEntryModal({ onClose, onAdd, patientId }) {
  const [formData, setFormData] = useState({
    UserId: patientId,
    EntryDate: "",
    EntryTitle: "",
    EntryContent: "",
    Feelings: [],
    ImageUrl: "",
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "Feelings") {
      const feelingsArray = value.split(",").map((feeling) => feeling.trim());
      setFormData((prevState) => ({
        ...prevState,
        [name]: feelingsArray,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const convertedDate = new Date(formData.EntryDate).toISOString();

      const formattedData = {
        ...formData,
        EntryDate: convertedDate,
      };

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/JournalEntries`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );
      if (response.ok) {
        getUserJournalEntries();
        NotificationManager.success(
          "Journal entry added successfully",
          "Success"
        );
        onClose();
      } else {
        const responseData = await response.json();
        if (responseData && responseData.validationsErrors) {
          console.error(
            "Failed to add journal entry:",
            responseData.validationsErrors
          );
          NotificationManager.error(responseData.validationsErrors[0], "Error");
        }
      }
    } catch (error) {
      console.error("Error adding journal entry:", error);
      NotificationManager.error(error, "Error");
    }
  };

  function getCurrentDate() {
    const date = new Date();
    date.setDate(date.getDate());
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date
      .getDate()
      .toString()
      .padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="modal-overlay modal-overlay-journaling">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content modal-content-journaling modal-add-journal-entry-page">
        <button
          className="close-button close-button-journaling"
          onClick={onClose}
        >
          ✖
        </button>
        <h2>Add journal entry</h2>
        <form className="journaling-form" onSubmit={handleSubmit}>
          <label className="label-date-journaling">
            Date:
            <input
              type="date"
              name="EntryDate"
              value={formData.EntryDate}
              onChange={handleChange}
              max={getCurrentDate()}
              className="date-input"
            />
          </label>
          <label className="label-title-journaling">
            Title:
            <input
              type="text"
              name="EntryTitle"
              value={formData.EntryTitle}
              onChange={handleChange}
            />
          </label>
          <label className="label-content-journaling">
            Content:
            <textarea
              name="EntryContent"
              value={formData.EntryContent}
              onChange={handleChange}
            />
          </label>
          <button className="form-btn-journaling" type="submit">
            Add journal entry
          </button>
        </form>
      </div>
    </div>
  );
}

export default JournalEntryModal;
