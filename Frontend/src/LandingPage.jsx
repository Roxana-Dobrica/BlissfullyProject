import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <section className="menu-landing-page">
        <div className="logo-section">
          <img
            className="logo-image"
            src="./images/LandingPage/blissfully_logo.png"
          />
        </div>
        <div className="menu-section-landing-page">
          <ul className="menu-list">
            {/* <li className="menu-item">Contact us</li> */}
          </ul>
          <ul className="menu-list-login-register">
            <Link to="/login" className="link-to-login-page">
              <li className="menu-item menu-item-log-in">Log in</li>
            </Link>
            <li>
              <Link to="/login" className="link-to-login-page">
                <button className="menu-button-sign-up">Sign up</button>
              </Link>
            </li>
          </ul>
        </div>
      </section>
      <section className="top-section-landing-page">
        <div className="top-section-left-landing-page">
          <h1 className="top-section-title-landing-page">
            Empower your mind, elevate your life
          </h1>
          <p className="top-section-description">
            Discover the path to personal growth and fulfillment with
            Blissfully. Explore a variety of activities and practices designed
            to enhance your mental well-being and maximize your potential.
          </p>
          <Link to="/login">
            <button className="top-section-button">Get started</button>
          </Link>
        </div>
        <div className="top-section-right-landing-page">
          <img
            className="top-section-image-landing-page"
            src="./images/LandingPage/personal-growth1.png"
          />
        </div>
        <div className="custom-shape-divider-bottom-1713469561">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
              className="shape-fill"
            ></path>
          </svg>
        </div>
      </section>
      <div className="middle-section-landing-page">
        <div className="middle-section-element">
          <img
            src="./images/LandingPage/progress.png"
            className="middle-section-image"
            alt="image"
          />
          <h3>Progress Monitoring and Tracking</h3>
          <p>Keep track of your emotional progress effortlessly.</p>
        </div>
        <div className="middle-section-element">
          <img
            src="./images/LandingPage/collaboration.png"
            className="middle-section-image"
            alt="image"
          />
          <h3>Efficient Therapist-Patient Collaboration</h3>
          <p>Enhance communication and collaboration with your therapist.</p>
        </div>
        <div className="middle-section-element">
          <img
            src="./images/LandingPage/database.png"
            className="middle-section-image"
            alt="image"
          />
          <h3>Easy and Secure Access to All Your Data</h3>
          <p>Access and manage your therapy data anytime, anywhere.</p>
        </div>
        <div className="middle-section-element">
          <img
            src="./images/LandingPage/easy-access.png"
            className="middle-section-image"
            alt="image"
          />
          <h3>Intuitive and User friendly experience</h3>
          <p>Enjoy a seamless and intuitive user interface.</p>
        </div>
      </div>
      <div className="middle-section-landing-page-2">
        <h2>Why choose Blissfully?</h2>
        <div className="middle-section-element-2">
          <ul>
            <li>
              <img
                src="./images/LandingPage/check.png"
                className="check-image"
                alt="check"
              />
              <p>
                {" "}
                Efficient organization for therapists and progress monitoring
                for patients.{" "}
              </p>
            </li>
            <li>
              <img
                src="./images/LandingPage/check.png"
                className="check-image"
                alt="check"
              />
              <p>
                {" "}
                Intuitive platform for journaling, facilitating the recording of
                thoughts, triggers, and symptoms.{" "}
              </p>
            </li>
            <li>
              <img
                src="./images/LandingPage/check.png"
                className="check-image"
                alt="check"
              />
              <p>
                {" "}
                Access to resources and therapeutic activities curated by
                therapists, tailored to each patient's needs.{" "}
              </p>
            </li>
            <li>
              <img
                src="./images/LandingPage/check.png"
                className="check-image"
                alt="check"
              />
              <p>
                {" "}
                Stimulating patient engagement and participation through the
                inclusion of diverse activities within the platform.{" "}
              </p>
            </li>
            <li>
              <img
                src="./images/LandingPage/check.png"
                className="check-image"
                alt="check"
              />
              <p>
                {" "}
                Seamless communication between patients and therapists,
                including real-time feedback and note exchange.{" "}
              </p>
            </li>
            <li>
              <img
                src="./images/LandingPage/check.png"
                className="check-image"
                alt="check"
              />
              <p>
                {" "}
                Integration of artificial intelligence capabilities, including a
                chatbot companion for immediate support and guidance.{" "}
              </p>
            </li>
            <li>
              <img
                src="./images/LandingPage/check.png"
                className="check-image"
                alt="check"
              />
              <p>
                {" "}
                Implementation of sentiment analysis to provide deeper insights
                into users' emotional state.{" "}
              </p>
            </li>
            <li>
              <img
                src="./images/LandingPage/check.png"
                className="check-image"
                alt="check"
              />
              <p>
                {" "}
                User-friendly interface, ensuring easy navigation and
                accessibility for all users.{" "}
              </p>
            </li>
          </ul>
        </div>
        <div className="footer-landing-page">
          <img
            className="logo-image logo-image-footer"
            src="./images/LandingPage/blissfully_logo.png"
          />
          <p>Contact us: blissfully.team@gmail.com</p>
            <div className="social-media-section">
              <a href="https://www.facebook.com" target="_blank">
                <img
                  className="social-media-logo facebook-logo"
                  src="./images/LandingPage/facebook.png"
                />
              </a>
              <a href="https://www.linkedin.com" target="_blank">
                <img
                  className="social-media-logo"
                  src="./images/LandingPage/linkedin.png"
                />
              </a>
              <a href="https://www.instagram.com" target="_blank">
                <img
                  className="social-media-logo"
                  src="./images/LandingPage/instagram.png"
                />
              </a>
            </div>
            <p>Copyright © Blissfully 2024</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
