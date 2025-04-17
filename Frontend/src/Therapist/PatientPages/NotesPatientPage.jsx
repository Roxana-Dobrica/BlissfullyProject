import React from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Tab from "react-bootstrap/Tab";
import TherapistMenu from "../../TherapistMenu";
import { deleteNote } from "../../PatientPageService";

function NotesPatientPage() {
  const { patientId } = useParams();
  const [notes, setNotes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [isDeleteNoteModalOpen, setIsDeleteNoteModalOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);

  const getPatientNotes = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/Notes/patient/${patientId}`
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

  const renderNotes = () => {
    return notes.map((note, index) => (
      <div
        key={index}
        className={`note-patient-container note-patient-container-therapist-page note-background note${(index %
          6) +
          1}`}
        onClick={() => handleNoteClick(note)}
      >
        <div
          className="delete-note-button"
          onClick={(e) => handleDeleteNoteClick(e, note.noteId)}
        >
          ✖
        </div>
        <div className="note-content-patient">
          {truncateWords(note.noteContent, 85)}
        </div>
        <div className="note-date-patient">
          Added on: {formattedDate(note.noteDate)}
        </div>
      </div>
    ));
  };

  useEffect(() => {
    if (patientId) {
      getPatientNotes();
    }
  }, [patientId]);

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

  const handleDeleteNoteClick = (e, noteId) => {
    e.stopPropagation(); 
    const note = notes.find((not) => not.noteId === noteId);
    console.log(note);
    setNoteToDelete(note);
    setIsDeleteNoteModalOpen(true);
  };

  const confirmDeleteNote = async () => {
    if (!noteToDelete) return;
    console.log(noteToDelete.noteId);
    const success = await deleteNote(noteToDelete.noteId);
    if (success) {
      setNotes((prevNotes) =>
        prevNotes.filter((note) => note.noteId !== noteToDelete.noteId)
      );
      setIsDeleteNoteModalOpen(false);
    }
  };

  const closeModalDeleteNote = () => {
    setIsDeleteNoteModalOpen(false);
  };

  const handleNoteClick = (note) => {
    setSelectedNote(note);
  };

  const closeSelectedNoteModal = () => {
    setSelectedNote(null);
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
            <h1 className="patient-activities-page-therapist-title">Notes</h1>
          </div>
          {notes.length > 0 ? (
            <div className="patient-page-notes-container">
              {notes && notes.length > 0 && renderNotes(pageNumber)}
            </div>
          ) : (
            <div className="no-notes-available">No notes available.</div>
          )}
          {selectedNote && (
            <div className="modal-overlay">
              <div
                className="background"
                onClick={closeSelectedNoteModal}
              ></div>
              <div className="modal-content modal-content-selected-activity">
                <div>
                  <button
                    className="close-button close-button-selected-activity"
                    onClick={closeSelectedNoteModal}
                  >
                    ✖
                  </button>
                </div>
                <div className="selected-activity-info">
                  <div className="selected-activity-description">
                    {selectedNote.noteContent}
                  </div>
                  <div className="selected-activity-due-date">
                    Date: {formattedDate(selectedNote.noteDate)}
                  </div>
                </div>
              </div>
            </div>
          )}
          {isDeleteNoteModalOpen && noteToDelete && (
            <div className="modal-overlay modal-overlay-delete-feedback">
              <div className="background" onClick={closeModalDeleteNote}></div>
              <div className="modal-content modal-content-delete-feedback">
                <h2>Delete Note</h2>
                <p>Are you sure you want to delete this note?</p>
                <div className="delete-feedback-modal-buttons">
                  <button
                    className="cancel-delete-feedback"
                    onClick={closeModalDeleteNote}
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
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default NotesPatientPage;
