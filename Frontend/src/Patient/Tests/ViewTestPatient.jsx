import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Tab, Col, ListGroup } from "react-bootstrap";
import { useUser } from "/src/UserContext";
import "./ViewTestPatient.css";
import { useNavigate } from "react-router-dom";
import PatientMenu from "/src/PatientMenu.jsx";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";

function ViewTestPatient() {
  const { testId } = useParams();
  const [testItems, setTestItems] = useState([]);
  const [responses, setResponses] = useState({});
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState("#testspatient");
  const navigate = useNavigate();

  const fetchTestItems = async (testId) => {
    try {
      const questionsResponse = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/TestQuestions/test/${testId}`
      );
      const textsResponse = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/TestTexts/test/${testId}`
      );

      if (questionsResponse.ok && textsResponse.ok) {
        const questionsData = await questionsResponse.json();
        const textsData = await textsResponse.json();

        const questions = questionsData.questions || [];
        const texts = textsData.texts || [];

        const allItems = [...questions, ...texts];
        const sortedItems = allItems.sort((a, b) => a.order - b.order);
        setTestItems(sortedItems);
      } else {
        console.log("Failed to fetch questions or texts.");
        setTestItems([]);
      }
    } catch (error) {
      console.error("Error fetching questions or texts:", error);
      setTestItems([]);
    }
  };

  const handleInputChange = (questionId, value, type) => {
    setResponses((prevResponses) => {
      const updatedResponses = { ...prevResponses };
      if (type === 0) {
        // single choice
        updatedResponses[questionId] = [value];
      } else if (type === 1) {
        // multiple choice
        if (!updatedResponses[questionId]) {
          updatedResponses[questionId] = [];
        }
        if (updatedResponses[questionId].includes(value)) {
          updatedResponses[questionId] = updatedResponses[questionId].filter(
            (item) => item !== value
          );
        } else {
          updatedResponses[questionId] = [
            ...updatedResponses[questionId],
            value,
          ];
        }
      } else if (type === 2) {
        // text input
        updatedResponses[questionId] = [value];
      }
      return updatedResponses;
    });
  };

  const handleSubmit = async () => {
    for (const questionId of Object.keys(responses)) {
      const answerPayload = {
        testId: testId,
        testQuestionId: questionId,
        patientId: user.nameid,
        answer: responses[questionId],
      };

      try {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/PatientTestAnswer`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(answerPayload),
          }
        );

        if (!response.ok) {
          console.error(`Failed to save answer for question ${questionId}`);
        } else {
          markTestAsCompleted(user.nameid, testId);
          console.log("Answer saved successfully.");
          navigateTo("/patient-dashboard");
        }
      } catch (error) {
        console.error(`Error saving answer for question ${questionId}:`, error);
      }
    }

    console.log("All answers saved successfully.");
  };

  const markTestAsCompleted = async (patientId, testId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTestAssignments/patient/${patientId}/test/${testId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            patientId: patientId,
            testId: testId,
            isCompleted: true,
          }),
        }
      );

      if (!response.ok) {
        console.error("Failed to mark test as completed:", response.status);
      } else {
        console.log("Test marked as completed.");
        NotificationManager.success("Test submitted successfully.", "Success");
        navigate("/patient-dashboard#testspatient");
      }
    } catch (error) {
      console.error("Error marking test as completed:", error);
      NotificationManager.error("Failed to submit test.", "Error");
    }
  };

  useEffect(() => {
    fetchTestItems(testId);
  }, [testId]);

  const handleNavigation = (path) => {
    setActiveTab(path);
    navigate(path);
  };

  return (
    <div className="patient-dashboard therapist-dashboard view-test-therapist-page">
      <NotificationContainer />
      <Tab.Container
        className="list-patient-dashboard"
        id="list-group-tabs"
        defaultActiveKey="#link4"
      >
        <PatientMenu />
        <Tab.Content className="tab-content-wrapper">
          <div className="view-test-container">
            <div className="view-test-header">
              <h1 className="view-test-title">View Test</h1>
            </div>
            <div className="questions-container">
              {testItems &&
                testItems.length > 0 &&
                testItems.map((item, index) => {
                  if (item.question) {
                    const questionIndex = testItems
                      .slice(0, index + 1)
                      .filter((i) => i.question).length;
                    return (
                      <div key={index} className="question-container-test">
                        <div>
                          <h2 className="view-test-patient-question-title">
                            Question {questionIndex}
                          </h2>
                          <p>{item.question}</p>
                          <div className="question-options">
                            {item.type === 0 &&
                              item.answers &&
                              item.answers.length > 0 &&
                              item.answers.map((answer, answerIndex) => (
                                <div
                                  className="question-options-container"
                                  key={answerIndex}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${item.testQuestionId}`}
                                    value={answer}
                                    onChange={() =>
                                      handleInputChange(
                                        item.testQuestionId,
                                        answer,
                                        item.type
                                      )
                                    }
                                  />
                                  <label>{answer}</label>
                                </div>
                              ))}
                            {item.type === 1 &&
                              item.answers &&
                              item.answers.length > 0 &&
                              item.answers.map((answer, answerIndex) => (
                                <div
                                  className="question-options-container"
                                  key={answerIndex}
                                >
                                  <input
                                    type="checkbox"
                                    name={`question-${item.testQuestionId}`}
                                    value={answer}
                                    onChange={() =>
                                      handleInputChange(
                                        item.testQuestionId,
                                        answer,
                                        item.type
                                      )
                                    }
                                  />
                                  <label>{answer}</label>
                                </div>
                              ))}
                            {item.type === 2 && (
                              <div className="question-options-container">
                                <textarea
                                  name={`question-${item.testQuestionId}`}
                                  value={
                                    responses[item.testQuestionId]
                                      ? responses[item.testQuestionId][0]
                                      : ""
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      item.testQuestionId,
                                      e.target.value,
                                      item.type
                                    )
                                  }
                                  style={{ resize: "both" }}
                                />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="text-container-view-test">
                        <p>{item.text}</p>
                      </div>
                    );
                  }
                })}
            </div>
            <button className="submit-test-patient-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default ViewTestPatient;
