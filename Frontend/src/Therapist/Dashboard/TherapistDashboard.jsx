import React, { useState, useEffect } from 'react';
import './TherapistDashboard.css';
import { useUser } from '/src/UserContext';
import { Calendar } from 'react-calendar'; 
import { Link } from 'react-router-dom';
import storage from '/src/firebase';

function TherapistDashboard() {

    const [userData, setUserData] = useState(null);
    const { user } = useUser();
    const [latestNews, setLatestNews] = useState([]);
    const [patientsData, setPatientsData] = useState([]);
    const [appointments, setAppointments] = useState([]);
    const [profileImageUrl, setProfileImageUrl] = useState(null);
    const [tests, setTests] = useState([]);

    const fetchLatestNews = async () => {
        try {
            const cachedNews = localStorage.getItem('cachedNews');
            if (cachedNews) {
                const parsedNews = JSON.parse(cachedNews);
                const fiveHoursAgo = Date.now() - (5 * 60 * 60 * 1000);
                if (parsedNews.data.length > 0) {
                    if (parsedNews.timestamp > fiveHoursAgo) {
                        setLatestNews(parsedNews.data[0]);
                        return; 
                    }
                } 
            }

            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/NewsApi`);
            if (response.ok) {
                const newNews = await response.json();
                const timestamp = Date.now(); 
                localStorage.setItem('cachedNews', JSON.stringify({ data: newNews, timestamp }));
                setLatestNews(newNews);
            } else {
                console.error('Failed to fetch news');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const getTherapistsAppointments = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Appointments/therapist/${user.nameid}`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.appointments)) {
                    const today = new Date();
                    const filteredAppointments = data.appointments.filter(appointment => {
                        const appointmentDate = new Date(appointment.appointmentDate);
                        return appointmentDate >= today;
                    });
                    setAppointments(filteredAppointments);
                } 
            } else {
                console.log('Failed to fetch appointments:', response.status);
            }
        } catch (error) {
            console.log('Error fetching appointments:', error);
        }
    }

    const fetchUserData = async (userId) => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${userId}`);
            if (response.ok) {
                const userData = await response.json();
                setUserData(userData);
                storage
                    .ref()
                    .child(userData.profileImageUrl) 
                    .getDownloadURL()
                    .then((url) => {
                        setProfileImageUrl(url)
                    })
                    .catch((err) => {
                        alert(err.message);
                    });
            } else {
                console.error('Failed to fetch user data');
            }
        }
        catch (error) {
            console.error('Error fetching user data:', error);
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token && user && user.nameid) {
                    await fetchUserData(user.nameid);
                    console.log('Profile imageeeee', profileImageUrl);
                } else {
                    console.error('Token or user data missing');
                    return;
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        fetchLatestNews();
        getTherapistsAppointments();
        fetchTherapistsTests();
    }, []);

    const handleClickProfile = () => {
        console.log("Profile clicked");
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token && user && user.nameid) {
                    fetchUserData(user.nameid);
                } else {
                    console.error('Token or user data missing');
                    return;
                }
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchData();
    }, [user]);

    useEffect(() => {
        if (userData) {
            getTherapistsPatients();
        }
    }, [userData]);

    const getTherapistsPatients = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/PatientTherapist/therapist/${userData.id}`);
            if (!response.ok) {
                console.log('Failed to fetch patient data:', response.status)
            }
            const data = await response.json();
            if (!data.patientsTherapists) {
                return;
            }
            const patientsDataPromises = data.patientsTherapists.map(async (patientTherapist) => {
                const patientId = patientTherapist.patientId;
                const patientResponse = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/users/${patientId}`);
                if (!patientResponse.ok) {
                    console.log(`Failed to fetch data for patient with ID ${patientId}:`, patientResponse.status);
                    return null;
                }
                return await patientResponse.json();
            });
        const patientsData = await Promise.all(patientsDataPromises);
        setPatientsData(patientsData);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        }
    };

    const fetchTherapistsTests = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Tests/therapist/${userData.id}`);
            if (response.ok) {
                const data = await response.json();
                if (Array.isArray(data.tests)) {
                    setTests(data.tests);
                }
            } else {
                console.log('Failed to fetch tests:', response.status);
            }
        } catch (error) {
            console.log('Error fetching tests:', error);
        }
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
        <div className="therapist-dashboard-container full-width">
            {userData && (
                <div className="therapist-dashboard-center">
                    <div className="therapist-dashboard-center-top">
                        <div className="therapist-dashboard-number-patients therapist-dashboard-center-top-item">
                            <div className="center-top-title">
                                <p className="therapist-dashboard-number-title">Number of patients</p>
                            </div>
                            <h1 className="therapist-dashboard-number-value">{patientsData.length}</h1>
                            <p className="therapist-dashboard-see-all">See all</p>
                        </div>
                        <div className="therapist-dashboard-number-appointments therapist-dashboard-center-top-item">
                            <div className="center-top-title">
                                <p className="therapist-dashboard-number-title">Number of appointments</p>
                            </div>
                            <h1 className="therapist-dashboard-number-value">{appointments.length}</h1>
                            <p className="therapist-dashboard-see-all">See all</p>
                        </div>
                        <div className="therapist-dashboard-number-tests therapist-dashboard-center-top-item">
                            <div className="center-top-title">
                                <p className="therapist-dashboard-number-title">Number of tests</p>
                            </div>
                            <h1 className="therapist-dashboard-number-value">3</h1>
                            <p className="therapist-dashboard-see-all">See all</p>
                        </div>
                    </div>
                        <div className="therapist-dashboard-patients-table">
                            <h1 className="therapist-dashboard-patients-table-title">Your patients</h1>
                            <div className="container-therapist-patients-table">
                                <table className="table table-therapist-patients table-therapist-patients-dashboard">
                                <thead>
                                    <tr>
                                    <th scope="col">No.</th>
                                    <th scope="col">First Name</th>
                                    <th scope="col">Last Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                {patientsData.length === 0 ? (
                                    <tr>
                                        <td colSpan="6">No patients</td>
                                    </tr>
                                ) : (
                                    patientsData.map((patient, index) => (
                                        <tr key={index}>
                                            <td>{index + 1}</td>
                                            <td>{patient.givenName}</td> 
                                            <td>{patient.surname}</td> 
                                            <td>{patient.userName}</td> 
                                            <td>{patient.email}</td> 
                                            <td>
                                                <div className="all-tests-therapist-buttons-container">
                                                    <Link to={`/patient/${patient.id}`} className="view-patient-btn">View</Link>
                                                </div>
                                            </td>

                                        </tr>
                                    ))
                                )}
                            </tbody>
                                </table>
                    </div>
                        </div>
                        <div className="therapist-dashboard-bottom">
                            <div className="therapist-dashboard-news">
                                <h1 className="therapist-dashboard-news-title title-bottom-therapist-dashboard">Latest news</h1>
                                <div className="therapist-dashboard-news-container">
                                    <div className="therapist-dashboard-news-info">
                                        <h2 className="therapist-dashboard-latest-news-title">{latestNews.title}</h2>
                                        <a className="therapist-dashboard-news-read-more" href={latestNews.url} target="_blank" rel="noopener noreferrer">Read more</a>
                                        <div className="therapist-dashboard-news-image">
                                            <img src="./images/TherapistDashboard/news-dashboard.png" alt="news-image" className="therapist-dashboard-news-image" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="therapist-dashboard-notes">
                                <h1 className="title-bottom-therapist-dashboard">Notes</h1>
                                <div className="therapist-dashboard-notes-container">
                                    <p className="therapist-dashboard-notes-text">Upcoming conference: Annual Psychology Conference, on 20/06, at 14:30PM, at Grand Hotel Conference Hall </p>
                                </div>
                            </div>
                            <div className="therapist-dashboard-calendar" style={{ minWidth: '290px' }}>
                                <h1 className="title-bottom-therapist-dashboard">Calendar</h1>
                                <Calendar  className="custom-calendar" 
                                />
                            </div>
                        </div>
                </div>
            )}
            <div className="therapist-dashboard-right patient-dashboard-right">
                {userData && (
                <div className="patient-profile-container patient-profile-container-dashboard">
                    <div className="top-section-profile">
                    <h1>Profile</h1>
                        {userData.profileImageUrl ? (
                                <img src={profileImageUrl} alt="profile-image" className="profile-image" />
                            ) : (
                              <img src="/images/profile-image.png" alt="profile-image" className="profile-image" />
                            )}
                    <h2 className="patient-name-profile">{userData.givenName} {userData.surname}</h2>
                    </div>
                    <div className="patient-profile-information">
                    <p>@{userData.userName}</p>
                    <div className="profile-information-details">
                        <img src="./images/Patient/mail.png" alt="profile-icon" className="profile-icon" />
                        {userData.email}<br />
                    </div>
                    <div className="profile-information-details">
                        <img src="./images/Patient/phone.png" alt="profile-icon" className="profile-icon" />
                        {userData.phoneNumber}<br />
                    </div>
                    <div className="profile-information-details">
                        <img src="./images/Patient/calendar.png" alt="profile-icon" className="profile-icon profile-icon-calendar" />
                        {formattedDate(userData.dateOfBirth)}<br />
                    </div>
                    <button className="link-profile-patient-dashboard" onClick={handleClickProfile}>See all</button>
                    </div>
                </div>
                )}
                <div className="patient-dashboard-chatbot">
                <div className="patient-dashboard-chatbot-title">
                    <img src="./images/PatientDashboard/chatbot-image.jpg" alt="chatbot" className="chatbot-image-dashboard" />
                    <p>BuddyBot</p>
                </div>
                <p className="text-chatbot-patient-dashboard">Hi! How can i help you today?</p>
                <div className="link-chatbot-patient-dashboard">
                    <img src="./images/PatientDashboard/bubble-chat.png" alt="chatbot-icon" className="chatbot-chat-dashboard-icon" />
                    <p onClick={() => navigateToSection('chatbot')}>Chat with BuddyBot</p>
                </div>
                </div>
            </div>
        </div>
    );
}

export default TherapistDashboard;