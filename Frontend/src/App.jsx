import Login from "./Login";
import PatientSettings from "./PatientSettings";
import PatientDashboard from "./PatientDashboard";
import Therapist from "./Therapist";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./UserContext";
import PatientPage from "./PatientPage";
import LandingPage from "./LandingPage";
import CreateTest from "./Therapist/Tests/CreateTest";
import ViewTestTherapist from "./Therapist/Tests/ViewTestTherapist";
import ViewTestPatient from "./Patient/Tests/ViewTestPatient";
import ViewCompletedTestTherapist from "./Therapist/Tests/ViewCompletedTestTherapist";
import PrivateRoute from "./Routes/PrivateRoute";
import ResetPassword from "./ResetPassword";
import ActivitiesPatientPage from "./Therapist/PatientPages/ActivitiesPatientPage";
import NotesPatientPage from "./Therapist/PatientPages/NotesPatientPage";
import FeedbacksPatientPage from "./Therapist/PatientPages/FeedbacksPatientPage";
import MusicPatientPage from "./Therapist/PatientPages/MusicPatientPage";
import VideosPatientPage from "./Therapist/PatientPages/VideosPatientPage";
import ReadingPatientPage from "./Therapist/PatientPages/ReadingPatientPage";
import PodcastsPatientPage from "./Therapist/PatientPages/PodcastsPatientPage";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route
            path="/patient-settings"
            element={<PrivateRoute element={<PatientSettings />} />}
          />
          <Route
            path="/patient-dashboard"
            element={<PrivateRoute element={<PatientDashboard />} />}
          />
          <Route
            path="/therapist"
            element={<PrivateRoute element={<Therapist />} />}
          />
          <Route
            path="/patient/:patientId"
            element={<PrivateRoute element={<PatientPage />} />}
          />
          <Route
            path="/therapist/create-test"
            element={<PrivateRoute element={<CreateTest />} />}
          />
          <Route
            path="/therapist/test/:testId"
            element={<PrivateRoute element={<ViewTestTherapist />} />}
          />
          <Route
            path="/patient/test/:testId"
            element={<PrivateRoute element={<ViewTestPatient />} />}
          />
          <Route
            path="/completed-test/patient/:patientId/test/:testId"
            element={<PrivateRoute element={<ViewCompletedTestTherapist />} />}
          />
          <Route
            path="/patient/:patientId/activities"
            element={<PrivateRoute element={<ActivitiesPatientPage />} />}
          />
          <Route
            path="/patient/:patientId/notes"
            element={<PrivateRoute element={<NotesPatientPage />} />}
          />
          <Route
            path="/patient/:patientId/feedbacks"
            element={<PrivateRoute element={<FeedbacksPatientPage />} />}
          />
          <Route
            path="/patient/:patientId/music"
            element={<PrivateRoute element={<MusicPatientPage />} />}
          />
          <Route
            path="/patient/:patientId/videos"
            element={<PrivateRoute element={<VideosPatientPage />} />}
          />
          <Route
            path="/patient/:patientId/reading"
            element={<PrivateRoute element={<ReadingPatientPage />} />}
          />
          <Route
            path="/patient/:patientId/podcasts"
            element={<PrivateRoute element={<PodcastsPatientPage />} />}
          />
        </Routes>
      </UserProvider>
    </Router>
  );
}

export default App;
