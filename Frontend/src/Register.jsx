import "./Register.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <>
      <div className="container-page">
        <div className="container-login">
          <h1 className="title-register">Create new account</h1>
          <div className="toggle-buttons">
            <button
              className={`toggle-button left-toggle-button ${
                selectedUserType === "patient" ? "selected" : ""
              }`}
              onClick={() => handleUserTypeSelect("patient")}
            >
              Patient
            </button>
            <button
              className={`toggle-button right-toggle-button ${
                selectedUserType === "therapist" ? "selected" : ""
              }`}
              onClick={() => handleUserTypeSelect("therapist")}
            >
              Therapist
            </button>
          </div>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="textbox">
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="textbox">
              <input
                type="text"
                placeholder="Given Name"
                value={username}
                onChange={(e) => setGivenName(e.target.value)}
              />
            </div>
            <div className="textbox">
              <input
                type="text"
                placeholder="Surname"
                value={username}
                onChange={(e) => setSurname(e.target.value)}
              />
            </div>
            <div className="textbox">
              <input
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="textbox">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="textbox">
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button type="submit" className="login-btn register-btn">
              Sign up
            </button>
            <p className="feedback">{feedback}</p>
            <div className="sign-up-section">
              <p>Already have an account?</p>
              <Link to="/" className="sign-up-btn">
                Sign in
              </Link>
            </div>
          </form>
        </div>
        <img
          src="/images/aaa.jpg"
          alt="icon"
          className="login-image register-image"
        />
      </div>
    </>
  );
}

export default Register;
