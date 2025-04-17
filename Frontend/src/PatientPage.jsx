import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap/dist/react-bootstrap.min.js";
import "./Therapist.css";
import "./PatientPage.css";
import AddActivityTherapistModal from "./AddActivityTherapistModal.jsx";
import AddResourceTherapistModal from "./AddResourceTherapistModal.jsx";
import "react-notifications/lib/notifications.css";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import AddNoteTherapistModal from "./AddNoteTherapistModal.jsx";
import { fetchPatientActivities } from "./PatientPageService.jsx";
import { fetchPatientNotes } from "./PatientPageService.jsx";
import { fetchPatientTests } from "./PatientPageService.jsx";
import { fetchTestsInfo } from "./PatientPageService.jsx";
import {
  fetchPatientMusic,
  fetchPatientVideos,
  fetchPatientReading,
  fetchPatientPodcasts,
  fetchTherapistFeedbacks,
} from "./PatientPageService.jsx";
import { Tab, Col, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";
import TherapistMenu from "./TherapistMenu.jsx";
import storage from "./firebase";
import FeelingsChart from "./FeelingsChart";

function PatientPage() {
  const { patientId } = useParams();
  const [patientData, setPatientData] = useState(null);
  const [showAddActivityModal, setShowAddActivityModal] = useState(false);
  const [showAddResourceModal, setShowAddResourceModal] = useState(false);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);
  const [activities, setActivities] = useState(null);
  const [notes, setNotes] = useState(null);
  const [resources, setResources] = useState(null);
  const [tests, setTests] = useState([]);
  const [completedTests, setCompletedTests] = useState([]);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [musicResources, setMusicResources] = useState([]);
  const [videosResources, setVideosResources] = useState([]);
  const [readingResources, setReadingResources] = useState([]);
  const [podcastsResources, setPodcastsResources] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);

  const fetchPatientData = async (patientId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${patientId}`
      );
      if (response.ok) {
        const patientData = await response.json();
        setPatientData(patientData);
        storage
          .ref()
          .child(patientData.profileImageUrl)
          .getDownloadURL()
          .then((url) => {
            setProfileImageUrl(url);
          })
          .catch((err) => {
            alert(err.message);
          });
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleOpenAddActivityModal = () => {
    setShowAddActivityModal(true);
  };

  const handleCloseAddActivityModal = () => {
    setShowAddActivityModal(false);
  };

  const handleOpenAddResourceModal = () => {
    setShowAddResourceModal(true);
  };

  const handleCloseAddResourceModal = () => {
    setShowAddResourceModal(false);
  };

  const handleOpenAddNoteModal = () => {
    setShowAddNoteModal(true);
  };

  const handleCloseAddNoteModal = () => {
    setShowAddNoteModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchPatientData(patientId);
        const activities = await fetchPatientActivities(patientId);
        setActivities(activities.activities);

        const notes = await fetchPatientNotes(patientId);
        setNotes(notes.notes);

        const { testIds, completedTestIds } = await fetchPatientTests(patientId);
        setCompletedTests(completedTestIds);
        const testsData = await fetchTestsInfo(testIds);
        setTests(testsData);

        const musicResources = await fetchPatientMusic(patientId);
        setMusicResources(musicResources);

        const videosResources = await fetchPatientVideos(patientId);
        setVideosResources(videosResources);

        const readingResources = await fetchPatientReading(patientId);
        setReadingResources(readingResources);

        const podcastsResources = await fetchPatientPodcasts(patientId);
        setPodcastsResources(podcastsResources);

        const feedbacks = await fetchTherapistFeedbacks(patientId);
        setFeedbacks(feedbacks);
        console.log(feedbacks);
      } catch (error) {
        console.error("Error fetching patient data:", error);
      }
    };

    fetchData();
    preloadImages(imageUrls);
  }, [patientId]);

  const handleAddActivity = (updatedActivities) => {
    setActivities(updatedActivities);
  };

  const handleAddNote = (updatedNotes) => {
    setNotes(updatedNotes);
  };

  const handleAddResource = (updatedResources) => {
    setResources(updatedResources);
  };

  const truncateWords = (description, wordsLength) => {
    if (description.length > wordsLength) {
      return description.slice(0, wordsLength) + "...";
    }
    return description;
  };

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const imageUrls = [];

  const numImages = 16;

  for (let i = 1; i <= numImages; i++) {
    const imageUrl = `/images/Resources/resource${i}.jpg`;
    imageUrls.push(imageUrl);
  }

  function preloadImages(urls) {
    urls.forEach((url) => {
      const img = new Image();
      img.src = url;
    });
  }

  return (
    <div className="patient-dashboard therapist-dashboard view-test-therapist-page">
      <Tab.Content className="create-test-therapist-tab">
        <TherapistMenu />
      </Tab.Content>
      <NotificationContainer />
      <Tab.Container
        className="list-patient-dashboard"
        id="list-group-tabs"
        defaultActiveKey="#link3"
      >
        <Tab.Content className="tab-content-wrapper tab-content-patient-page-therapist">
          <div className="patient-page-therapist-container">
            {patientData && (
              <div className="patient-data-therapist">
                <div className="patient-page-therapist-profile">
                  <div className="patient-page-profile-left">
                    {patientData.profileImageUrl ? (
                      <img
                        src={profileImageUrl}
                        alt="profile-image"
                        className="profile-image"
                      />
                    ) : (
                      <img
                        src="./images/Patient/profile-image.png"
                        alt="default-profile-image"
                        className="profile-image"
                      />
                    )}
                  </div>
                  <div className="patient-page-profile-right">
                    <div className="patient-page-profile-information-left">
                      <h2 className="patient-page-name">
                        {patientData.givenName} {patientData.surname}
                      </h2>
                      <p>@{patientData.userName}</p>
                      <div className="info-patient-row">
                        <img
                          src="/images/Patient/mail.png"
                          alt="profile-icon"
                          className="profile-icon patient-page-icon"
                        />
                        <p>Email: </p>
                        {patientData.email}
                        <br />
                      </div>
                      <div className="info-patient-row">
                        <img
                          src="/images/Patient/phone.png"
                          alt="profile-icon"
                          className="profile-icon patient-page-icon"
                        />
                        <p>Phone Number:</p>
                        {patientData.phoneNumber}
                        <br />
                      </div>
                      <div className="info-patient-row">
                        <img
                          src="/images/Patient/calendar.png"
                          alt="profile-icon"
                          className="profile-icon profile-icon-calendar patient-page-icon"
                        />
                        <p>Birthdate:</p>{" "}
                        {formattedDate(patientData.dateOfBirth)}
                        <br />
                      </div>

                      <div className="info-patient-row">
                        <img
                          src="/images/Patient/location.png"
                          alt="profile-icon"
                          className="profile-icon patient-page-icon"
                        />
                        <p>City:</p> Iasi
                        <br />
                      </div>
                      <div className="info-patient-row">
                        <img
                          src="/images/Patient/flag.png"
                          alt="profile-icon"
                          className="profile-icon patient-page-icon"
                        />
                        <p>Country:</p> Romania
                        <br />
                      </div>
                    </div>
                    <div className="patient-page-profile-information-right">
                      <FeelingsChart
                        className="patient-page-chart"
                        patientId={patientData.id}
                      />
                    </div>
                  </div>
                </div>
                <div className="patient-page-therapist-activities">
                  <div className="patient-page-element-header">
                    <div className="sub-header-patient-page">
                      <h2>Activities</h2>
                      <p className="patient-page-link-to">
                        <Link to={`/patient/${patientId}/activities`}>
                          <p className="patient-page-link-to">
                            See all
                            <img
                              src="/images/Patient/right-arrow2.png"
                              alt="arrow-right"
                              className="play-icon-music"
                            />
                          </p>
                        </Link>
                      </p>
                    </div>
                    <button
                      className="add-item-for-patient-btn"
                      onClick={() => handleOpenAddActivityModal()}
                    >
                      Add activity
                    </button>
                    {showAddActivityModal && (
                      <AddActivityTherapistModal
                        onClose={handleCloseAddActivityModal}
                        onAdd={handleAddActivity}
                        patientId={patientData.id}
                      />
                    )}
                  </div>
                  <div className="activities-list-patient-page">
                    {patientData &&
                      activities &&
                      Array.isArray(activities) &&
                      activities.slice(0, 5).map((activity) => (
                        <div
                          className="activity-patient-page"
                          key={activity.activityId}
                        >
                          <div className="activity-patient-page-header">
                            <h3>{activity.activityTitle}</h3>
                          </div>
                          <p className="patient-page-card-content">
                            {truncateWords(activity.activityDescription, 95)}
                          </p>
                          <p className="due-date-activity-patient-page">
                            Due: {formattedDate(activity.activityDueDate)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="patient-page-therapist-notes">
                  <div className="patient-page-element-header">
                    <div className="sub-header-patient-page">
                      <h2>Notes</h2>
                      <p className="patient-page-link-to">
                        <Link to={`/patient/${patientId}/notes`}>
                          <p className="patient-page-link-to">
                            See all
                            <img
                              src="/images/Patient/right-arrow2.png"
                              alt="arrow-right"
                              className="play-icon-music"
                            />
                          </p>
                        </Link>
                      </p>
                    </div>
                    <button
                      className="add-item-for-patient-btn"
                      onClick={() => handleOpenAddNoteModal()}
                    >
                      Add note
                    </button>
                    {showAddNoteModal && (
                      <AddNoteTherapistModal
                        onClose={handleCloseAddNoteModal}
                        onAdd={handleAddNote}
                        patientId={patientData.id}
                      />
                    )}
                  </div>
                  <div className="notes-list-patient-page">
                    {patientData &&
                      notes &&
                      Array.isArray(notes) &&
                      notes.slice(0, 5).map((note) => (
                        <div className="note-patient-page" key={note.noteId}>
                          <p className="patient-page-card-content">
                            {truncateWords(note.noteContent, 95)}
                          </p>
                          <p className="added-on-note-patient-page">
                            Added on: {formattedDate(note.noteDate)}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
                <div className="patient-page-feedbacks">
                  <div className="patient-page-element-header">
                    <div className="sub-header-patient-page">
                      <h2>Feedbacks</h2>
                      <p className="patient-page-link-to">
                        <Link to={`/patient/${patientId}/feedbacks`}>
                          <p className="patient-page-link-to">
                            See all
                            <img
                              src="/images/Patient/right-arrow2.png"
                              alt="arrow-right"
                              className="play-icon-music"
                            />
                          </p>
                        </Link>
                      </p>
                    </div>
                  </div>
                  <div className="notes-list-patient-page feedbacks-list-patient-page">
                    {patientData &&
                      feedbacks &&
                      Array.isArray(feedbacks.therapistFeedbacks) &&
                      feedbacks.therapistFeedbacks
                        .slice(0, 5)
                        .map((feedback) => (
                          <div
                            className="note-patient-page feedback-patient-page"
                            key={feedback.therapistFeedbackId}
                          >
                            <p className="patient-page-card-content">
                              {truncateWords(feedback.feedback, 95)}
                            </p>
                            <p className="added-on-feedback-patient-page">
                              Added on: {formattedDate(feedback.feedbackDate)}
                            </p>
                          </div>
                        ))}
                  </div>
                </div>

                <div className="patient-page-therapist-resources">
                  <div className="patient-page-element-header">
                    <h2>Resources</h2>
                    <button
                      className="add-item-for-patient-btn add-item-resource-for-patient"
                      onClick={() => handleOpenAddResourceModal()}
                    >
                      Add resource
                    </button>
                    {showAddResourceModal && (
                      <AddResourceTherapistModal
                        onClose={handleCloseAddResourceModal}
                        onAdd={handleAddResource}
                        patientId={patientData.id}
                      />
                    )}
                  </div>
                  <div className="patient-page-resources-container">
                    <div className="patient-page-element-header">
                      <div className="sub-header-patient-page">
                        <h3>Music</h3>
                        <p className="patient-page-link-to patient-page-link-to-music">
                          <Link to={`/patient/${patientId}/music`}>
                            <p className="patient-page-link-to-resource">
                              See all
                              <img
                                src="/images/Patient/right-arrow2.png"
                                alt="arrow-right"
                                className="play-icon-music"
                              />
                            </p>
                          </Link>
                        </p>
                      </div>
                    </div>
                    <div className="patient-page-therapist-music">
                      {patientData &&
                        musicResources &&
                        Array.isArray(musicResources.materials) &&
                        musicResources.materials
                          .filter(
                            (musicResource) =>
                              musicResource.addedByDoctorId !== null
                          )
                          .slice(0, 5)
                          .map((musicResource, index) => (
                            <div
                              className="card card-resource card-resource-patient-page"
                              key={musicResource.materialId}
                            >
                              <img
                                src={imageUrls[index % numImages]}
                                className="card-img-top-patient-page"
                                alt="cover"
                              />
                              <div className="card-body">
                                <h5 className="card-title card-resource-title">
                                  {musicResource.materialTitle}
                                </h5>
                                <p className="card-text card-resource-description">
                                  {musicResource.materialDescription}
                                </p>
                                <div className="bottom-card-section">
                                  <a
                                    href={musicResource.materialUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <div className="play-button-container">
                                      <p>Play</p>
                                      <img
                                        src="/images/PatientResources/play-button.png"
                                        alt="Play"
                                        className="play-icon-music"
                                      />
                                    </div>
                                  </a>
                                </div>
                              </div>
                            </div>
                          ))}
                    </div>

                    <div className="patient-page-videos-container">
                      <div className="sub-header-patient-page">
                        <h3>Videos</h3>
                        <p className="patient-page-link-to">
                          <Link to={`/patient/${patientId}/videos`}>
                            <p className="patient-page-link-to-resource">
                              See all
                              <img
                                src="/images/Patient/right-arrow2.png"
                                alt="arrow-right"
                                className="play-icon-music"
                              />
                            </p>
                          </Link>
                        </p>
                      </div>
                      <div className="patient-page-therapist-music">
                        {patientData &&
                          videosResources &&
                          Array.isArray(videosResources.materials) &&
                          videosResources.materials
                            .filter(
                              (videoResource) =>
                                videoResource.addedByDoctorId !== null
                            )
                            .slice(0, 5)
                            .map((videosResources, index) => (
                              <div
                                className="card card-resource card-resource-patient-page"
                                key={videosResources.materialId}
                              >
                                <img
                                  src={imageUrls[(index + 5) % numImages]}
                                  className="card-img-top-patient-page"
                                  alt="cover"
                                />
                                <div className="card-body">
                                  <h5 className="card-title card-resource-title">
                                    {videosResources.materialTitle}
                                  </h5>
                                  <p className="card-text card-resource-description">
                                    {videosResources.materialDescription}
                                  </p>
                                  <div className="bottom-card-section">
                                    <a
                                      href={videosResources.materialUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div className="play-button-container">
                                        <p>Play</p>
                                        <img
                                          src="/images/PatientResources/play-button.png"
                                          alt="Play"
                                          className="play-icon-music"
                                        />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                    <div className="patient-page-reading-container">
                      <div className="sub-header-patient-page">
                        <h3>Reading</h3>
                        <p className="patient-page-link-to">
                          <Link to={`/patient/${patientId}/reading`}>
                            <p className="patient-page-link-to-resource">
                              See all
                              <img
                                src="/images/Patient/right-arrow2.png"
                                alt="arrow-right"
                                className="play-icon-music"
                              />
                            </p>
                          </Link>
                        </p>
                      </div>
                      <div className="patient-page-therapist-music">
                        {patientData &&
                          readingResources &&
                          Array.isArray(readingResources.materials) &&
                          readingResources.materials
                            .filter(
                              (readingResource) =>
                                readingResource.addedByDoctorId !== null
                            )
                            .slice(0, 5)
                            .map((readingResources, index) => (
                              <div
                                className="card card-resource card-resource-patient-page"
                                key={readingResources.materialId}
                              >
                                <img
                                  src={imageUrls[(index + 10) % numImages]}
                                  className="card-img-top-patient-page"
                                  alt="cover"
                                />
                                <div className="card-body">
                                  <h5 className="card-title card-resource-title">
                                    {readingResources.materialTitle}
                                  </h5>
                                  <p className="card-text card-resource-description">
                                    {readingResources.materialDescription}
                                  </p>
                                  <div className="bottom-card-section">
                                    <a
                                      href={readingResources.materialUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div className="play-button-container">
                                        <p>Read</p>
                                        <img
                                          src="/images/PatientResources/right-arrow.png"
                                          alt="Play"
                                          className="play-icon-music"
                                        />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                    <div className="patient-page-podcasts-container">
                      <div className="sub-header-patient-page">
                        <h3>Podcasts</h3>
                        <p className="patient-page-link-to">
                          <Link
                            to={`/patient/${patientId}/podcasts`}
                            className="no-underline-link"
                          >
                            <p className="patient-page-link-to-resource">
                              See all
                              <img
                                src="/images/Patient/right-arrow2.png"
                                alt="arrow-right"
                                className="play-icon-music"
                              />
                            </p>
                          </Link>
                        </p>
                      </div>
                      <div className="patient-page-therapist-music patint-page-therapist-music-2">
                        {patientData &&
                          podcastsResources &&
                          Array.isArray(podcastsResources.materials) &&
                          podcastsResources.materials
                            .filter(
                              (podcastResource) =>
                                podcastResource.addedByDoctorId !== null
                            )
                            .slice(0, 5)
                            .map((podcastsResources, index) => (
                              <div
                                className="card card-resource card-resource-patient-page"
                                key={podcastsResources.materialId}
                              >
                                <img
                                  src={imageUrls[(index + 16) % numImages]}
                                  className="card-img-top-patient-page"
                                  alt="cover"
                                />
                                <div className="card-body">
                                  <h5 className="card-title card-resource-title">
                                    {podcastsResources.materialTitle}
                                  </h5>
                                  <p className="card-text card-resource-description">
                                    {podcastsResources.materialDescription}
                                  </p>
                                  <div className="bottom-card-section">
                                    <a
                                      href={podcastsResources.materialUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                    >
                                      <div className="play-button-container">
                                        <p>Play</p>
                                        <img
                                          src="/images/PatientResources/play-button.png"
                                          alt="Play"
                                          className="play-icon-music"
                                        />
                                      </div>
                                    </a>
                                  </div>
                                </div>
                              </div>
                            ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="patient-page-therapist-tests">
                  <div className="patient-page-element-header">
                    <h2>Tests</h2>
                  </div>
                  <div className="table-tests-patient-page-therapist-container">
                    <table className="table table-therapist-patients table-all-tests-patient">
                      <thead>
                        <tr>
                          <th scope="col">No.</th>
                          <th scope="col">Title</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {tests.map((test, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{test.testTitle}</td>
                            <td className="buttons-patient-page-tests">
                              {completedTests.includes(test.testId) ? (
                                <Link
                                  to={`/completed-test/patient/${patientId}/test/${test.testId}`}
                                  className="button-link-test"
                                >
                                  <button className="view-test-button">
                                    Completed - View
                                  </button>
                                </Link>
                              ) : (
                                <button className="view-test-button">
                                  No answer
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default PatientPage;
