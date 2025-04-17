import React, { useEffect, useState } from "react";
import "./PatientSettings.css";
import { useUser } from "./UserContext";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";

function PatientSettings() {
  const [
    selectedMenuItemPatientSettings,
    setSelectedMenuItemPatientSettings,
  ] = useState("personal");
  const [userData, setUserData] = useState(null);
  const { user } = useUser();
  const [formState, setFormState] = useState({
    id: "",
    userName: "",
    email: "",
    givenName: "",
    surname: "",
    gender: "",
    dateOfBirth: "",
    phoneNumber: "",
    city: "",
    country: "",
  });

  const userDateOfBirth = userData ? userData.dateOfBirth.split("T")[0] : null;
  const [emailForReset, setEmailForReset] = useState("");

  const handleMenuItemClick = (menuItem) => {
    setSelectedMenuItemPatientSettings(menuItem);
  };

  const fetchUserData = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Users/${userId}`
      );
      if (response.ok) {
        const userData = await response.json();
        setUserData(userData);
        setFormState({
          id: userData.id || "",
          userName: userData.userName || "",
          email: userData.email || "",
          givenName: userData.givenName || "",
          surname: userData.surname || "",
          gender: userData.gender || "",
          dateOfBirth: userData.dateOfBirth
            ? userData.dateOfBirth.split("T")[0]
            : "",
          phoneNumber: userData.phoneNumber || "",
          city: userData.city || "",
          country: userData.country || "",
        });
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    if (user && user.nameid) {
      fetchUserData(user.nameid);
    }
  }, [user]);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormState({
      ...formState,
      [id]: value,
    });
  };

  const handleSaveInfoClick = async () => {
    const formattedData = {
      ...formState,
      dateOfBirth: new Date(formState.dateOfBirth).toISOString(),
    };
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(formattedData),
        }
      );
      if (response.ok) {
        NotificationManager.success(
          "Personal information updated successfully",
          "Success"
        );
        fetchUserData(user.nameid);
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    console.log("emailForReset", emailForReset);

    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/authentication/forgotpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: emailForReset }),
        }
      );

      if (response.ok) {
        NotificationManager.success(
          "Password reset email sent successfully! Please verify your email!",
          "Success"
        );
        setShowForgotPasswordModal(false);
      } else {
        const errorText = await response.text();
        NotificationManager.error(
          `Failed to send reset password email: ${errorText}`,
          "Error"
        );
      }
    } catch (error) {
      console.error("Error sending reset password email:", error);
      NotificationManager.error(
        "Failed to send reset password email.",
        "Error"
      );
    }
  };

  return (
    <div className="patient-settings">
      <NotificationContainer />
      <div className="settings-menu-patient">
        <h1>Settings</h1>
        <p
          className={
            selectedMenuItemPatientSettings === "personal"
              ? "selected-menu-item-patient-settings"
              : ""
          }
          onClick={() => handleMenuItemClick("personal")}
        >
          Personal information
        </p>
        <p
          className={
            selectedMenuItemPatientSettings === "security"
              ? "selected-menu-item-patient-settings"
              : ""
          }
          onClick={() => handleMenuItemClick("security")}
        >
          Security
        </p>
        {/* <p
          className={
            selectedMenuItemPatientSettings === "help"
              ? "selected-menu-item-patient-settings"
              : ""
          }
          onClick={() => handleMenuItemClick("help")}
        >
          Help
        </p> */}
      </div>

      {userData && selectedMenuItemPatientSettings === "personal" && (
        <div className="settings-profile-patient">
          <h2>Personal information</h2>
          <h3 className="settings-profile-title">Profile</h3>
          <p className="settings-info-secondary">
            This information will be displayed to your therapist.
          </p>

          <div className="settings-patient-name">
            <div className="settings-patient-first-name">
              <label htmlFor="givenName">First name</label>
              <input
                className="field-value-settings"
                type="text"
                id="givenName"
                value={formState.givenName}
                onChange={handleFormChange}
              />
            </div>

            <div className="settings-patient-last-name">
              <label htmlFor="surname">Last name</label>
              <input
                className="field-value-settings"
                type="text"
                id="surname"
                value={formState.surname}
                onChange={handleFormChange}
              />
            </div>
          </div>

          <label htmlFor="userName">Username</label>
          <input
            className="field-value-settings"
            type="text"
            id="userName"
            value={formState.userName}
            onChange={handleFormChange}
          />

          <label htmlFor="email">Email</label>
          <input
            className="field-value-settings"
            type="text"
            id="email"
            value={formState.email}
            onChange={handleFormChange}
          />

          <label htmlFor="phoneNumber">Phone number</label>
          <input
            className="field-value-settings"
            type="text"
            id="phoneNumber"
            value={formState.phoneNumber}
            onChange={handleFormChange}
          />

          <div className="settings-patient-gender-container">
            <label htmlFor="gender" className="settings-patient-gender">
              Gender
            </label>
            <select
              className="field-value-settings"
              id="gender"
              value={formState.gender}
              onChange={handleFormChange}
            >
              <option className="field-value-settings" value="Male">
                Male
              </option>
              <option className="field-value-settings" value="Female">
                Female
              </option>
              <option className="field-value-settings" value="Other">
                Other
              </option>
            </select>
          </div>

          <div className="settings-patient-date-of-birth">
            <label htmlFor="dateOfBirth">Birthdate</label>
            <input
              style={{ border: "1px solid #cccccc", borderRadius: "5px" }}
              className="field-value-settings"
              type="date"
              id="dateOfBirth"
              value={formState.dateOfBirth}
              min="1923-01-01"
              max="2005-01-01"
              onChange={handleFormChange}
            ></input>
          </div>

          <div className="settings-patient-location">
            <div className="settings-patient-city">
              <label htmlFor="city">City</label>
              <input
                className="field-value-settings"
                type="text"
                id="city"
                value={formState.city}
                onChange={handleFormChange}
              />
            </div>

            <div className="settings-patient-country">
              <label htmlFor="country">Country</label>
              <input
                className="field-value-settings"
                type="text"
                id="country"
                value={formState.country}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <button
            className="patient-settings-button"
            onClick={handleSaveInfoClick}
          >
            Save
          </button>
        </div>
      )}
      {userData && selectedMenuItemPatientSettings === "security" && (
        <div className="settings-security-patient">
          <h2>Security</h2>
          <h3 className="settings-profile-subtitle">Change password</h3>
          <p className="introduce-email"> Please introduce your email address below. </p>
          <form onSubmit={handleForgotPasswordSubmit}>
            <input
              className="change-password-input-login"
              type="email"
              value={emailForReset}
              onChange={(e) => setEmailForReset(e.target.value)}
              required
            />
            <button className="patient-settings-reset-password-button" type="submit">Send</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default PatientSettings;
