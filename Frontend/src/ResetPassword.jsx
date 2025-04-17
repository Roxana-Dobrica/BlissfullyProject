import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ResetPassword.css";
import { NotificationManager, NotificationContainer } from "react-notifications";

function ResetPassword() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const email = searchParams.get("email");
  let token = searchParams.get("token");

  if (token && token.includes(" ")) {
    token = token.replace(/ /g, "+");
  }

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetErrors, setResetErrors] = useState({});
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setResetErrors({ confirmPassword: "Passwords must match" });
      return;
    }

    if (!verifyPasswordValidity(password)) {
      setResetErrors({
        password:
          "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character",
      });
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Authentication/resetpassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            token: token,
            password: password,
          }),
        }
      );

      const responseText = await response.text();
      console.log("Response from server:", responseText);

      if (!response.ok) {
        throw new Error(responseText);
      }

      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        data = responseText; 
      }

      if (data[0] === 1 || data === "Password reset successfully!") {
        NotificationManager.success("Password reset successfully!", "Success", 2000);
        setSuccess(true);
      } else {
        setMessage("Failed to reset password.");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      setMessage("Failed to reset password.");
    }
  };

  useEffect(() => {}, [token]);

  const verifyPasswordValidity = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="reset-password-container">
      <NotificationContainer />
      <div className="reset-password-form">
        <h1 className="reset-password-title">Reset password</h1>
        <form onSubmit={handleFormSubmit}>
          <p>New password</p>
          <input
            className={`form-control-reset-password ${resetErrors.password &&
              "input-error"}`}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {resetErrors.password && (
            <p className="error-message-reset-password">
              {resetErrors.password}
            </p>
          )}
          <p>Confirm new password</p>
          <input
            className={`form-control-reset-password ${resetErrors.confirmPassword &&
              "input-error"}`}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {resetErrors.confirmPassword && (
            <p className="error-message-reset-password">
              {resetErrors.confirmPassword}
            </p>
          )}
          <button className="submit-reset-password" type="submit">
            Reset password
          </button>
        </form>
        {message && <p>{message}</p>}
        {success && (
          <p>
            Password reset successfully! Click <button className="navigate-to-login-from-reset" onClick={() => navigate('/login')}>here</button> to go to login.
          </p>
        )}
      </div>
    </div>
  );
}

export default ResetPassword;