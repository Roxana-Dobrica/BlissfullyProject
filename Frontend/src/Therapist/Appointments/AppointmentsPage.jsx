import React from "react";
import { useState } from "react";
import { useUser } from "/src/UserContext";
import AddAppointmentModal from "/src/Modals/AddAppointmentModal.jsx";
import { NotificationContainer } from "react-notifications";
import { useEffect } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./AppointmentsPage.css";

const localizer = momentLocalizer(moment);
function AppointmentsPage() {
  const { user } = useUser();
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [patientData, setPatientData] = useState({});
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [appointmentToDelete, setAppointmentToDelete] = useState(null);
  const [patientNames, setPatientNames] = useState("");

  const getTherapistsAppointments = async () => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/Appointments/therapist/${user.nameid}`
      );
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data.appointments)) {
          setAppointments(data.appointments);
          const patientIds = data.appointments.map(
            (appointment) => appointment.patientId
          );
          const names = {};
          await Promise.all(
            patientIds.map(async (patientId) => {
              const userData = await getUserById(patientId);
              if (userData) {
                names[patientId] = `${userData.givenName} ${userData.surname}`;
              }
            })
          );
          setPatientNames(names);
        } else {
          setAppointments([]);
        }
        console.log("Therapists appointments:", data.appointments);
      } else {
        console.log("Failed to fetch appointments:", response.status);
      }
    } catch (error) {
      console.log("Error fetching appointments:", error);
    }
  };

  const fetchPatientData = async (patientId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${patientId}`
      );
      if (response.ok) {
        const data = await response.json();
        setPatientData(data);
      } else {
        console.error("Failed to fetch patient data");
      }
    } catch (error) {
      console.error("Error fetching patient data:", error);
    }
  };

  const openAppointmentModal = () => {
    setIsAppointmentModalOpen(true);
  };

  const closeAppointmentModal = () => {
    setIsAppointmentModalOpen(false);
  };

  const handleDeleteAppointment = (appointmentId) => {
    const appointmentToDelete = appointments.find(
      (appointment) => appointment.appointmentId === appointmentId
    );
    setAppointmentToDelete(appointmentToDelete);
    setIsDeleteModalOpen(true);
  };

  const confirmDeleteAppointment = async () => {
    if (!appointmentToDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Appointments/${
          appointmentToDelete.appointmentId
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            appointmentId: appointmentToDelete.appointmentId,
          }),
        }
      );
      if (response.ok) {
        console.log("Appointment deleted successfully");
        setAppointments((prevAppointments) =>
          prevAppointments.filter(
            (appointment) =>
              appointment.appointmentId !== appointmentToDelete.appointmentId
          )
        );
        setIsDeleteModalOpen(false);
      } else {
        console.error("Failed to delete appointment");
      }
    } catch (error) {
      console.error("Error deleting appointment:", error);
    }
  };

  const getUserById = async (userId) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${userId}`
      );
      if (response.ok) {
        const data = await response.json();
        return { givenName: data.givenName, surname: data.surname };
      } else {
        console.error(`Failed to fetch user data for user with ID ${userId}`);
        return null;
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      return null;
    }
  };

  const closeModalDeleteAppointment = () => {
    setIsDeleteModalOpen(false);
  };

  useEffect(() => {
    getTherapistsAppointments();
  }, [user]);

  const formatAppointments = (appointments) => {
    const formatted = appointments.map((appointment) => ({
      id: appointment.appointmentId,
      title: patientNames[appointment.patientId] || appointment.patientId, 
      start: new Date(
        `${appointment.appointmentDate.split("T")[0]}T${appointment.startTime}`
      ),
      end: new Date(
        `${appointment.appointmentDate.split("T")[0]}T${appointment.endTime}`
      ),
      resource: appointment,
      tooltip: `Appointment with ${patientNames[appointment.patientId] ||
        appointment.patientId}`,
    }));
    console.log("Formatted appointments:", formatted);
    return formatted;
  };

  return (
    <div className="appointments-page-therapist-container">
      <h1 className="appointments-page-title-therapist">Appointments</h1>
      <NotificationContainer />
      <button className="add-appointment-button" onClick={openAppointmentModal}>
        Add new
      </button>
      {isAppointmentModalOpen && (
        <AddAppointmentModal
          isOpen={isAppointmentModalOpen}
          onClose={closeAppointmentModal}
          fetchAppointments={getTherapistsAppointments}
        />
      )}
      <Calendar
        localizer={localizer}
        events={formatAppointments(appointments)}
        startAccessor="start"
        endAccessor="end"
        defaultView={Views.WEEK}
        views={["day", "week"]}
        style={{ height: 600 }}
        className="appointment-therapist-calendar"
        eventPropGetter={(event, start, end, isSelected) => {
          const index = appointments.findIndex(
            (app) => app.appointmentId === event.id
          );
          const classNames = ["color-0", "color-1", "color-2", "color-3"];
          const className = classNames[index % 4];
          return { className };
        }}
        onSelectEvent={(event) => handleDeleteAppointment(event.id)} 
      />
      {isDeleteModalOpen && appointmentToDelete && (
        <div className="modal-overlay modal-overlay-delete-feedback modal-overlay-delete-appointemnt">
          <div
            className="background"
            onClick={closeModalDeleteAppointment}
          ></div>
          <div className="modal-content modal-content-delete-feedback">
            <h2>Delete Appointment</h2>
            <p>Are you sure you want to delete this appointment?</p>
            <div className="delete-feedback-modal-buttons">
              <button
                className="cancel-delete-feedback"
                onClick={closeModalDeleteAppointment}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-feedback"
                onClick={confirmDeleteAppointment}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AppointmentsPage;
