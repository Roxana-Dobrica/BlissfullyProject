import React from "react";
import { useUser } from "./UserContext";
import { useEffect, useState } from "react";
import "./PatientProfile.css";
import storage from "./firebase";
import { useLocation, useNavigate } from "react-router-dom";

function PatientProfile({ onChangeTab }) {
  const [userData, setUserData] = useState(null);
  const { user } = useUser();
  const [profileImageUrl, setProfileImageUrl] = useState(
    "C://Users//Roxana//Desktop//TherapyApp//public//images//Patient//profile_image.png"
  );
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [activeTab, setActiveTab] = useState("#profile");
  const navigate = useNavigate();

  const changeTab = (tabKey) => {
    setActiveTab(tabKey);
    navigate(`/patient-dashboard${tabKey}`);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token && user && user.nameid) {
          fetchUserData(user.nameid);
          storage
            .ref()
            .child(uploadedImageUrl)
            .getDownloadURL()
            .then((url) => {
              setProfileImageUrl(url);
            })
            .catch((err) => {
              alert(err.message);
            });
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

  const formattedDate = (date) => {
    const newDate = new Date(date);
    const day = newDate.getDate();
    const month = newDate.getMonth() + 1;
    const year = newDate.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleClickProfileImage = async () => {
    try {
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.onchange = async (event) => {
        const file = event.target.files[0];

        const formData = new FormData();
        formData.append("file", file);

        try {

          const token = localStorage.getItem("token");

          const response = await fetch(
            `${
              import.meta.env.VITE_REACT_APP_API_ENDPOINT
            }/users/upload-profile-image`,
            {
              method: "POST",
              body: formData,
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const { url } = await response.json();
            setUploadedImageUrl(url.name);
            setUserData({ ...userData, profileImageUrl: url });
            fetchUserData(user.nameid);
          } else {
            console.error("Failed to upload profile image");
          }
        } catch (error) {
          console.error("Error uploading profile image:", error);
        }
      };
      fileInput.click();
    } catch (error) {
      console.error("Error handling profile image:", error);
    }
  };

  return (
    <div className="patient-profile-page">
      {userData && (
        <div className="patient-profile-container">
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
                src="./images/Patient/profile-image.png"
                alt="default-profile-image"
                className="profile-image"
              />
            )}
            <button
              className="change-profile-image-btn"
              onClick={handleClickProfileImage}
            >
              Change photo
            </button>
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
              <strong>Email:</strong> {userData.email}
              <br />
            </div>
            <div className="profile-information-details">
              <img
                src="./images/Patient/phone.png"
                alt="profile-icon"
                className="profile-icon"
              />
              <strong>Phone Number:</strong> {userData.phoneNumber}
              <br />
            </div>
            <div className="profile-information-details">
              <img
                src="./images/Patient/calendar.png"
                alt="profile-icon"
                className="profile-icon profile-icon-calendar"
              />
              <strong>Birthdate:</strong> {formattedDate(userData.dateOfBirth)}{" "}
              <br />
            </div>
            <div className="profile-information-details">
              <img
                src="./images/Patient/location.png"
                alt="profile-icon"
                className="profile-icon"
              />
              <strong>City:</strong> {userData.city} <br />
            </div>
            <div className="profile-information-details">
              <img
                src="./images/Patient/flag.png"
                alt="profile-icon"
                className="profile-icon"
              />
              <strong>Country:</strong> {userData.country} <br />
            </div>
          </div>
          <div className="patient-profile-edit-btn">
            <button
              className="edit-profile-btn"
              onClick={() => changeTab("#settings")}
            >
              Edit Profile
              <img
                src="./images/Patient/right-arrow.png"
                alt="edit-icon"
                className="icon-arrow"
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default PatientProfile;
