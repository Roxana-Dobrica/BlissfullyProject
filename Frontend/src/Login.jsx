import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useUser } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Login.css";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

function Login() {
  const { setUser } = useUser();
  const navigateTo = useNavigate();

  const [errors, setErrors] = useState({});
  const [registerErrors, setRegisterErrors] = useState({});
  const [emailForReset, setEmailForReset] = useState("");
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [toggle, setToggle] = useState("Patient");

  const handleRegister = async (e) => {
    const role = toggle === "Patient" ? 1 : 2;
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formErrors = {};

    if (!formData.get("Username")) {
      formErrors.username = "Username is required";
    }
    if (!formData.get("GivenName")) {
      formErrors.givenName = "Given name is required";
    }
    if (!formData.get("Surname")) {
      formErrors.surname = "Surname is required";
    }
    if (!formData.get("Email")) {
      formErrors.email = "Email is required";
    }
    if (!formData.get("Password")) {
      formErrors.password = "Password is required";
    } else if (!verifyPasswordValidity(formData.get("Password"))) {
      formErrors.password =
        "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character";
    }
    if (!formData.get("ConfirmPassword")) {
      formErrors.confirmPassword = "Confirm Password is required";
    } else if (formData.get("Password") !== formData.get("ConfirmPassword")) {
      formErrors.confirmPassword = "Passwords must match";
    }

    setRegisterErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const jsonObject = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    const url = `${
      import.meta.env.VITE_REACT_APP_API_ENDPOINT
    }/authentication/register?role=${role}`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      });
      if (response.ok) {
        NotificationManager.success(
          "Registered successfully! You can now log in to your account.",
          "Success"
        );
      } else {
        const contentType = response.headers.get("content-type");
        let errorMessage = "Failed to register";

        if (contentType && contentType.includes("application/json")) {
          const responseData = await response.json();
          if (responseData) {
            errorMessage = responseData.message || JSON.stringify(responseData);
          }
        } else {
          const responseText = await response.text();
          errorMessage = responseText;
        }
        console.error("Failed to register:", errorMessage);
        if (errorMessage.includes("User already exists")) {
          NotificationManager.error(
            "Username already exists. Please try again with a different username.",
            "Error"
          );
        }
        if (errorMessage.includes("Email already exists")) {
          NotificationManager.error(
            "Email address already exists. Please try again with a different email.",
            "Error"
          );
        }
      }
    } catch (error) {
      console.error("Error:", error);
      NotificationManager.error(error.message, "Error");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);
    const formErrors = {};

    if (!formData.get("Username")) {
      formErrors.username = "Username is required";
    }
    if (!formData.get("Password")) {
      formErrors.password = "Password is required";
    }

    setErrors(formErrors);

    if (Object.keys(formErrors).length > 0) {
      return;
    }

    const jsonObject = {};
    formData.forEach((value, key) => {
      jsonObject[key] = value;
    });

    const url = `${
      import.meta.env.VITE_REACT_APP_API_ENDPOINT
    }/authentication/login`;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonObject),
      });
      if (response.ok) {
        const jwtToken = await response.text();
        const decodedToken = jwtDecode(jwtToken);
        setUser(decodedToken);
        localStorage.setItem("token", jwtToken);
        if (decodedToken.role === "Therapist") {
          navigateTo("/therapist");
        } else if (decodedToken.role === "Patient") {
          navigateTo("/patient-dashboard");
        }
      } else {
        NotificationManager.error(
          "Invalid credentials. Please try again.",
          "Error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const [addclass, setaddclass] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const verifyPasswordValidity = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();

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

  const toggleForgotPasswordModal = () => {
    setShowForgotPasswordModal(!showForgotPasswordModal);
  };

  const handleToggle = () => {
    setToggle(toggle === "Patient" ? "Therapist" : "Patient");
  };

  return (
    <div className="container-page-login-and-register">
      <NotificationContainer />
      <div
        className={`container ${addclass}`}
        id="container-login-and-register"
      >
        <div className="form-container  sign-up-container">
          <form onSubmit={(e) => handleRegister(e)}>
            <div className="login-form-container-title">
              <h1>Create Account</h1>
            </div>
            <div className="toggle-switch">
              <button
                className={`toggle-option ${
                  toggle === "Patient" ? "active" : ""
                }`}
                onClick={() => setToggle("Patient")}
              >
                Patient
              </button>
              <button
                className={`toggle-option ${
                  toggle === "Therapist" ? "active" : ""
                }`}
                onClick={() => setToggle("Therapist")}
              >
                Therapist
              </button>
            </div>
            <input type="text" placeholder="Username" name="Username" />
            {registerErrors.username && (
              <p className="error-message-field">{registerErrors.username}</p>
            )}
            <input type="text" placeholder="First name" name="GivenName" />
            {registerErrors.givenName && (
              <p className="error-message-field">{registerErrors.givenName}</p>
            )}
            <input type="text" placeholder="Last name" name="Surname" />
            {registerErrors.surname && (
              <p className="error-message-field">{registerErrors.surname}</p>
            )}
            <input type="email" placeholder="Email" name="Email" />
            {registerErrors.email && (
              <p className="error-message-field">{registerErrors.email}</p>
            )}
            <input type="password" placeholder="Password" name="Password" />
            {registerErrors.password && (
              <p className="error-message-field">{registerErrors.password}</p>
            )}
            <input
              type="password"
              placeholder="Confirm password"
              name="ConfirmPassword"
            />
            {registerErrors.confirmPassword && (
              <p className="error-message-field">
                {registerErrors.confirmPassword}
              </p>
            )}
            <button className="login-submit-btn" type="submit">
              Sign up
            </button>
          </form>
        </div>

        <div className="form-container sign-in-container">
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="login-form-container-title">
          <h1>Welcome back!</h1>
          <h4>Enter your username and password to log in.</h4>
        </div>
        <div className="input-container">
          <input type="text" placeholder="Username" name="Username" />
          {errors.username && (
            <p className="error-message-field">{errors.username}</p>
          )}
        </div>
        <div className="input-container input-container-login-password">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            name="Password"
            // data-show-password={showPassword}
          />
          <div
            onClick={togglePasswordVisibility}
            className={`password-visibility-icon ${
              showPassword ? "view-password" : "hide-password"
            }`}
          />
          {errors.password && (
            <p className="error-message-field">{errors.password}</p>
          )}
        </div>
            <a
              href="#"
              className="forgot-password-link"
              onClick={toggleForgotPasswordModal}
            >
              Forgot password?
            </a>
            <button className="login-submit-btn" type="submit">
              Sign in
            </button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <img
                src="/images/register-image.png"
                alt="icon"
                className="login-image"
              />
              <h1 className="title-login-register-page">Hello!</h1>
              <div className="title-login-register-description">
                If you already have an account, login here.
              </div>
              <button
                className="ghost login-button-reg"
                id="signIn"
                onClick={() => setaddclass("")}
              >
                Login
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <img
                src="/images/login-image.png"
                alt="icon"
                className="login-image"
              />
              <h1 className="title-login-register-page">
                Start your journey now
              </h1>
              <div className="title-login-register-description">
                If you don't have an account yet, join us and start your
                journey.
              </div>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setaddclass("right-panel-active")}
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
      {showForgotPasswordModal && (
        <div className="modal-overlay modal-overlay-forgot-password">
          <div className="modal-content">
            <button
              className="close-button"
              onClick={toggleForgotPasswordModal}
            >
              ✖
            </button>
            <h2>Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit}>
              <label>Please enter your email address:</label>
              <input
                className="forgot-password-input-login"
                type="email"
                value={emailForReset}
                onChange={(e) => setEmailForReset(e.target.value)}
                required
              />
              <button type="submit" className="forgot-password-button-login">
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Login;
