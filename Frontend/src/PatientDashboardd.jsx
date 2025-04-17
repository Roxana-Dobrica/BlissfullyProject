import React, { useState } from "react";
import { useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./PatientDashboard.css";
import "./Calendar.css";
import { useUser } from "./UserContext";
import { useImage } from "react-image";
import { Link } from "react-router-dom";
import FeelingsChart from "./FeelingsChart";
import storage from "./firebase";

function PatientDashboardd({ onChangeTab }) {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [isMusicImageLoading, setIsMusicImageLoading] = useState(true);
  const [isVideoImageLoading, setIsVideoImageLoading] = useState(true);
  const [isBooksImageLoading, setIsBooksImageLoading] = useState(true);
  const [isPodcastImageLoading, setIsPodcastImageLoading] = useState(true);
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);
  const [userId, setUserId] = useState(null);
  const [lastNote, setLastNote] = useState(null);
  const [lastActivity, setLastActivity] = useState(null);
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [therapist, setTherapist] = useState(null);

  const [activeTab, setActiveTab] = useState("#dashboard");

  const handleNotesClick = () => {
    setActiveTab("#notesfeedbacks");
  };

  const { src: imageMusic } = useImage({
    srcList: "./images/PatientDashboard/music.jpg",
    useSuspense: false,
    onError: () => setIsMusicImageLoading(false),
    onLoad: () => setIsMusicImageLoading(false),
  });

  const { src: imageVideo } = useImage({
    srcList: "./images/PatientDashboard/videos.jpg",
    useSuspense: false,
    onError: () => setIsVideoImageLoading(false),
    onLoad: () => setIsVideoImageLoading(false),
  });

  const { src: imageBooks } = useImage({
    srcList: "./images/PatientDashboard/books.jpg",
    useSuspense: false,
    onError: () => setIsBooksImageLoading(false),
    onLoad: () => setIsBooksImageLoading(false),
  });

  const { src: imagePodcast } = useImage({
    srcList: "./images/PatientDashboard/podcast.jpg",
    useSuspense: false,
    onError: () => setIsPodcastImageLoading(false),
    onLoad: () => setIsPodcastImageLoading(false),
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token && user && user.nameid) {
      fetchUserData(user.nameid);
      setUserId(user.nameid);
    }
  }, [user]);

  useEffect(() => {
    if (userData) {
      getPatientNotes();
      getUserActivities();
      getUserNextAppointments(userId);
      getPatientTherapist(userId);
    }
  }, [userData]);

  const formatHour = (hour) => {
    if (hour < 10) {
      return `0${hour}`;
    }
    return hour.slice(0, 5);
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
        storage
          .ref()
          .child(userData.profileImageUrl)
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

  const getPatientTherapist = async (userId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTherapist/patient/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setTherapist(data.patientTherapist);
        } else {
          console.error("PatientTherapist data is missing or empty");
        }
      } else {
        console.error("Failed to fetch patientTherapist");
      }
    } catch (error) {
      console.error("Error fetching patientTherapist:", error);
    }
  };

  const getUserNextAppointments = async (userId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/Appointments/patient/${userId}`
      );
      const data = await response.json();
      const appointmentsData = data.appointments;

      appointmentsData.sort(
        (a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate)
      );

      setAppointments(appointmentsData);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  const truncateWords = (description, wordsLength) => {
    if (!description) {
      return "";
    }

    if (description.length > wordsLength) {
      return description.slice(0, wordsLength) + "...";
    }
    return description;
  };

  const getPatientNotes = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Notes/patient/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.notes && data.notes.length > 0) {
          setNotes(data.notes);
          const lastNote = getLastNoteByDate(data.notes);
          setLastNote(lastNote);
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

  const getUserActivities = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Activities/patient/${
          userData.id
        }`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.activities) {
          data.activities.sort(
            (a, b) =>
              new Date(b.activityDateAdded) - new Date(a.activityDateAdded)
          );
          setActivities(data.activities);
          const lastActivity = getLastActivityByDate(data.activities);
          setLastActivity(lastActivity);
        } else {
          console.error("Activities data is missing or empty");
        }
      } else {
        console.error("Failed to fetch activities");
      }
    } catch (error) {
      console.error("Error fetching activities:", error);
    }
  };

  const getLastNoteByDate = (notes) => {
    notes.sort((a, b) => new Date(b.noteDate) - new Date(a.noteDate));
    return notes[0];
  };

  const getLastActivityByDate = (activities) => {
    activities.sort(
      (a, b) => new Date(b.activityDateAdded) - new Date(a.activityDateAdded)
    );
    return activities[0];
  };

  const navigateToSection = (sectionId) => {
    window.location.hash = sectionId;
  };

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <div className="patient-dashboard patient-dashboard-content full-width">
      {userData && (
        <div className="patient-dashboard-center">
          <div className="patient-dashboard-top-section">
            <div
              className="patient-dashboard-top-item"
              onClick={() => navigateToSection("notesfeedbacks")}
            >
              <div className="patient-dashboard-top-item-title">
                <p>Notes</p>
                <img
                  src="./images/PatientDashboard/notes-1.png"
                  alt="notes"
                  className="patient-dashboard-top-item-image"
                />
              </div>
              <div className="patient-dashboard-top-item-content">
                {lastNote && <p>{truncateWords(lastNote.noteContent, 80)}</p>}
              </div>
            </div>
            <div
              className="patient-dashboard-top-item"
              onClick={() => navigateToSection("journaling")}
            >
              <div className="patient-dashboard-top-item-title">
                <p>Journaling</p>
                <img
                  src="./images/PatientDashboard/notes-2.png"
                  alt="notes"
                  className="patient-dashboard-top-item-image"
                />
              </div>
              <div className="patient-dashboard-top-item-content">
                <p>
                  How do you feel today? Write your thoughts and feelings here.
                </p>
              </div>
            </div>
            <div
              className="patient-dashboard-top-item"
              onClick={() => navigateToSection("activities")}
            >
              <div className="patient-dashboard-top-item-title">
                <p>Activities</p>
                <img
                  src="./images/PatientDashboard/notes-3.png"
                  alt="notes"
                  className="patient-dashboard-top-item-image"
                />
              </div>
              <div className="patient-dashboard-top-item-content">
                {lastActivity && (
                  <p>{truncateWords(lastActivity.activityDescription, 80)}</p>
                )}
              </div>
            </div>
          </div>
          <div className="patient-dashboard-middle-section">
            <h2>Recommendation</h2>
            <div className="patient-dashboard-middle-items">
              <div
                className="patient-dashboard-middle-item"
                onClick={() => navigateToSection("resources")}
              >
                <img
                  src={imageMusic}
                  alt="music"
                  className="patient-dashboard-middle-item-image"
                />
                <div className="patient-dashboard-middle-item-title">
                  <p>Music</p>
                </div>
              </div>
              <div
                className="patient-dashboard-middle-item"
                onClick={() => navigateToSection("resources")}
              >
                <img
                  src={imageVideo}
                  alt="videos"
                  className="patient-dashboard-middle-item-image"
                />
                <div className="patient-dashboard-middle-item-title">
                  <p>Videos</p>
                </div>
              </div>
              <div
                className="patient-dashboard-middle-item"
                onClick={() => navigateToSection("resources")}
              >
                <img
                  src={imageBooks}
                  alt="books"
                  className="patient-dashboard-middle-item-image"
                />
                <div className="patient-dashboard-middle-item-title">
                  <p>Reading</p>
                </div>
              </div>
              <div
                className="patient-dashboard-middle-item"
                onClick={() => navigateToSection("resources")}
              >
                <img
                  src={imagePodcast}
                  alt="podcast"
                  className="patient-dashboard-middle-item-image"
                />
                <div className="patient-dashboard-middle-item-title">
                  <p>Podcasts</p>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-dashboard-bottom-section">
            <div className="patient-dashboard-bottom-item patient-dashboard-appointments">
              <h2>Next appointments</h2>
              {appointments &&
                appointments.slice(0, 2).map((appointment, index) => (
                  <div
                    key={index}
                    className="patient-dashboard-appointments-item tooltip-appointment-patient"
                  >
                    <p className="patient-dashboard-appointments-day">
                      {new Date(
                        appointment.appointmentDate
                      ).toLocaleDateString("en-GB", { weekday: "long" })}
                    </p>
                    <p className="patient-dashboard-appointments-date">
                      {formattedDate(appointment.appointmentDate)},{" "}
                      {formatHour(appointment.startTime)}-
                      {formatHour(appointment.endTime)}
                    </p>
                    <img
                      src="./images/PatientDashboard/calendar-dashboard.png"
                      alt="calendar"
                      className="patient-dashboard-calendar-img"
                    />
                    <span className="appointment">
                      {therapist && <div>{appointment.therapist.email}</div>}
                    </span>
                  </div>
                ))}
            </div>
            <div className="patient-dashboard-bottom-item">
              <h2>Statistics</h2>
              <FeelingsChart
                className="patient-dashboard-chart"
                patientId={userData.id}
              />
            </div>
          </div>
        </div>
      )}
      {userData && (
        <div className="patient-dashboard-right">
          <div className="patient-profile-container patient-profile-container-dashboard">
            <div className="top-section-profile">
              <h1>Profile</h1>
              {userData.profileImageUrl ? (
                <img
                  src={profileImageUrl}
                  alt="profile-image"
                  className="profile-image"
                />
              ) : (
                <img
                  src="./images/profile-image.png"
                  alt="profile-image"
                  className="profile-image"
                />
              )}
              <h2 className="patient-name-profile">
                {userData.givenName} {userData.surname}
              </h2>
            </div>
            <div className="patient-profile-information">
              <p>@{userData.userName}</p>
              <div className="profile-information-details">
                <img
                  src="./images/Patient/mail.png"
                  alt="profile-icon"
                  className="profile-icon"
                />
                {userData.email}
                <br />
              </div>
              <div className="profile-information-details">
                <img
                  src="./images/Patient/phone.png"
                  alt="profile-icon"
                  className="profile-icon"
                />
                {userData.phoneNumber}
                <br />
              </div>
              <div className="profile-information-details">
                <img
                  src="./images/Patient/calendar.png"
                  alt="profile-icon"
                  className="profile-icon profile-icon-calendar"
                />
                {formattedDate(userData.dateOfBirth)}
                <br />
              </div>
              <button
                className="link-profile-patient-dashboard"
                onClick={() => navigateToSection("profile")}
              >
                See all
              </button>
            </div>
          </div>

          <div className="patient-dashboard-chatbot">
            <div className="patient-dashboard-chatbot-title">
              <img
                src="./images/PatientDashboard/chatbot-image.jpg"
                alt="chatbot"
                className="chatbot-image-dashboard"
              />
              <p>BuddyBot</p>
            </div>
            <p className="text-chatbot-patient-dashboard">
              Hi! How can i help you today?
            </p>
            <div className="link-chatbot-patient-dashboard">
              <img
                src="./images/PatientDashboard/bubble-chat.png"
                alt="chatbot-icon"
                className="chatbot-chat-dashboard-icon"
              />
              <p onClick={() => navigateToSection("chatbot")}>
                Chat with BuddyBot
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PatientDashboardd;
