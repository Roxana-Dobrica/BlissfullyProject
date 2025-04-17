import React from "react";
import { useState, useEffect } from "react";
import "/src/PatientNotes.css";
import { useUser } from "/src/UserContext";
import AddNoteTherapistModal from "/src/AddNoteTherapistModal.jsx";
import "./NotesTherapist.css";

function NotesTherapist() {
  const [notes, setNotes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const notesPerPage = 15;
  const { user: userData } = useUser();
  const [isNoteContentModalOpen, setIsNoteContentModalOpen] = useState(false);
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const [
    isDeleteTherapistNoteModalOpen,
    setIsDeleteTherapistNoteModalOpen,
  ] = useState(false);

  const getPatientNotes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Notes/patient/${
          userData.nameid
        }`
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Data notes:", data);
        if (data.notes && data.notes.length > 0) {
          setNotes(data.notes);
        } else {
          console.log("No notes for this user.");
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

  const openAddNoteModal = () => {
    setIsAddNoteModalOpen(true);
  };

  const renderNotes = (pageNumber) => {
    const startIndex = (pageNumber - 1) * notesPerPage;
    const endIndex = startIndex + notesPerPage;
    return notes.slice(startIndex, endIndex).map((note, index) => (
      <div
        key={index}
        className={`note-patient-container note-background note${(index % 6) +
          1} note-for-therapist-container`}
        onClick={(event) => {
          event.stopPropagation();
          event.preventDefault();
          openNoteContentModal(note);
        }}
      >
        <button
          className="delete-note-for-therapist-button"
          onClick={(event) => {
            event.stopPropagation();
            event.preventDefault();
            openDeleteNoteTherapistModal(note);
          }}
        >
          <div
            onClick={(event) => {
              event.stopPropagation();
              event.preventDefault();
              openDeleteNoteTherapistModal(note);
            }}
          >
            ✖
          </div>
        </button>
        <div className="note-content-wrapper note-content-for-therapist-wrapper">
          <div className="note-content-patient">
            {truncateWords(note.noteContent, 90)}
          </div>
          <div className="note-date-patient">
            Added on: {formattedDate(note.noteDate)}
          </div>
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
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
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

  const closeAddNoteModal = () => {
    setIsAddNoteModalOpen(false);
  };

  const addNewNote = (updatedNotes) => {
    setNotes(updatedNotes);
    renderNotes(pageNumber);
  };

  const openDeleteNoteTherapistModal = (note) => {
    setSelectedNote(note);
    setIsDeleteTherapistNoteModalOpen(true);
  };

  const closeModalDeleteFeedback = () => {
    setIsDeleteTherapistNoteModalOpen(false);
    setSelectedNote(null);
  };

  const confirmDeleteNote = async () => {
    if (!selectedNote) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Notes/${
          selectedNote.noteId
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ noteId: selectedNote.noteId }),
        }
      );
      if (response.ok) {
        console.log("Note deleted successfully");
        setNotes(notes.filter((note) => note.noteId !== selectedNote.noteId));
        getPatientNotes();
      } else {
        console.error("Failed to delete note");
      }
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      setIsDeleteTherapistNoteModalOpen(false);
      setSelectedNote(null);
    }
  };

  return (
    <div className="patient-notes-page therapist-notes-page">
      <h1 className="patient-notes-title therapist-note-title">Notes</h1>
      <button className="add-note-for-therapist" onClick={openAddNoteModal}>
        Add new
        <img
          src="./images/Patient/add.png"
          alt="add-icon"
          className="add-icon-journaling"
        />
      </button>
      {notes.length > 0 ? (
        <div className="patient-notes-container therapist-notes-container">
          {notes && notes.length > 0 && renderNotes(pageNumber)}
        </div>
      ) : (
        <div className="no-notes-available">No notes available.</div>
      )}
      {isDeleteTherapistNoteModalOpen && selectedNote && (
        <div className="modal-overlay modal-overlay-delete-feedback">
          <div className="background" onClick={closeModalDeleteFeedback}></div>
          <div className="modal-content modal-content-delete-feedback">
            <h2>Delete Note</h2>
            <p>Are you sure you want to delete this note?</p>
            <div className="delete-feedback-modal-buttons">
              <button
                className="cancel-delete-feedback"
                onClick={closeModalDeleteFeedback}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-feedback"
                onClick={confirmDeleteNote}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
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
      {isAddNoteModalOpen && (
        <AddNoteTherapistModal
          onClose={closeAddNoteModal}
          onAdd={addNewNote}
          patientId={userData.nameid}
        />
      )}
    </div>
  );
}

export default NotesTherapist;
