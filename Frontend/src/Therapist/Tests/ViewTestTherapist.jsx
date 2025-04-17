import React from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Tab } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./ViewTestTherapist.css";
import AssignTestModal from "/src/Modals/AssignTestModal.jsx";
import { useNavigate } from "react-router-dom";
import {
  deleteTestQuestions,
  deleteTestTexts,
  deletePatientTestAnswers,
  deletePatientTestAssignments,
} from "./TestsService";
import TherapistMenu from "/src/TherapistMenu";

function ViewTestTherapist() {
  const { testId } = useParams();
  const [testItems, setTestItems] = useState([]);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const navigateTo = useNavigate();

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
        console.log("Data questions:", questionsData);
        console.log("Data texts:", textsData);

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

  const deleteTest = async (testId) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this test?"
    );
    if (!confirmation) {
      return;
    }
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Tests/${testId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            testId: testId,
          }),
        }
      );
      if (response.ok) {
        deleteTestQuestions(testId);
        deleteTestTexts(testId);
        deletePatientTestAnswers(testId);
        deletePatientTestAssignments(testId);
        console.log("Test deleted");
        navigateTo("/therapist#link4");
      }
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const openAssignModal = () => {
    setIsAssignModalOpen(true);
  };

  const closeAssignModal = () => {
    setIsAssignModalOpen(false);
  };

  useEffect(() => {
    fetchTestItems(testId);
  }, [testId]);

  const handleInputChange = (questionId, answer) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  return (
    <div className="patient-dashboard therapist-dashboard view-test-therapist-page">
      <Tab.Container
        className="list-patient-dashboard"
        id="list-group-tabs"
        defaultActiveKey="#link4"
      >
        <Tab.Content className="create-test-therapist-tab">
          <TherapistMenu />
        </Tab.Content>

        <Tab.Content className="tab-content-wrapper">
          <div className="view-test-container">
            <div className="view-test-header">
              <h1 className="view-test-title">View Test</h1>
              <div className="view-test-therapist-buttons-container">
                <button
                  className="assign-test-btn view-test-btn"
                  onClick={openAssignModal}
                >
                  Assign
                </button>
                {isAssignModalOpen && (
                  <AssignTestModal
                    isOpen={isAssignModalOpen}
                    onClose={closeAssignModal}
                    testId={testId}
                  />
                )}
                <button
                  className="delete-test-btn view-test-btn"
                  onClick={() => deleteTest(testId)}
                >
                  Delete
                </button>
              </div>
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
                          <h2 className="index-question-view-test">
                            Question {questionIndex}
                          </h2>
                          <p>{item.question}</p>
                          <div className="question-options">
                            {item.answers &&
                              item.answers.length > 0 &&
                              item.answers.map((answer, answerIndex) => (
                                <div
                                  className="question-options-container"
                                  key={answerIndex}
                                >
                                  {item.type === 0 && (
                                    <input
                                      type="radio"
                                      name={`question-${index}`}
                                      value={answer}
                                    />
                                  )}
                                  {item.type === 1 && (
                                    <input
                                      type="checkbox"
                                      name={`question-${index}`}
                                      value={answer}
                                    />
                                  )}
                                  {item.type === 2 && (
                                    <input
                                      type="text"
                                      name={`question-${index}`}
                                      value={answer}
                                    />
                                  )}
                                  <label>{answer}</label>
                                </div>
                              ))}
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
          </div>
        </Tab.Content>
      </Tab.Container>
    </div>
  );
}

export default ViewTestTherapist;
