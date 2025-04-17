import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "./UserContext";
import "./PatientNotes.css";

function PatientNotes() {
  const [notes, setNotes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const notesPerPage = 15;
  const { user: userData } = useUser();
  const [isNoteContentModalOpen, setIsNoteContentModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);

  const getPatientNotes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Notes/patient/${
          userData.nameid
        }`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.notes && data.notes.length > 0) {
          setNotes(data.notes);
        } else {
          setNotes([]);
        }
      } else {
        console.error("Failed to fetch notes");
      }
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const openNoteContentModal = (note) => {
    setSelectedNote(note);
    setIsNoteContentModalOpen(true);
  };

  const renderNotes = (pageNumber) => {
    const startIndex = (pageNumber - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    return notes.slice(startIndex, endIndex).map((note, index) => (
      <div
        key={index}
        className={`note-patient-container note-background note${(index % 6) +
          1}`}
        onClick={() => openNoteContentModal(note)}
      >
        <div className="note-content-patient note-content-patient-page">
          {truncateWords(note.noteContent, 95)}
        </div>
        <div className="note-date-patient">
          Added on: {formattedDate(note.noteDate)}
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (userData) {
      getPatientNotes();
    }
  }, [userData]);

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const truncateWords = (description, wordsLength) => {
    if (description.length > wordsLength) {
      return description.slice(0, wordsLength) + "...";
    }
    return description;
  };

  const closeViewNoteModal = () => {
    setIsNoteContentModalOpen(false);
    setSelectedNote(null);
  };

  return (
    <div className="patient-notes-page">
      {notes.length > 0 ? (
        <div className="patient-notes-container">
          {notes && notes.length > 0 && renderNotes(pageNumber)}
        </div>
      ) : (
        <div className="no-notes-available">No notes available.</div>
      )}
      {isNoteContentModalOpen && selectedNote && (
        <div className="modal-overlay modal-overlay-notes">
          <div className="background" onClick={closeViewNoteModal}></div>
          <div className="modal-content modal-content-notes">
            <button
              className="close-button close-button-notes"
              onClick={closeViewNoteModal}
            >
              ✖
            </button>
            <h2 className="modal-content-notes-title">Note Details</h2>
            <p className="note-details-content">{selectedNote.noteContent}</p>
            <p>Added on: {formattedDate(selectedNote.noteDate)}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientNotes;
