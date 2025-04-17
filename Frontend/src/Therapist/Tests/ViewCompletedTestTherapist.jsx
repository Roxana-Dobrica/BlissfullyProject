import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, ListGroup, Tab } from "react-bootstrap";
import "./ViewCompletedTestTherapist.css";
import TherapistMenu from "/src/TherapistMenu.jsx";

function ViewCompletedTestTherapist() {
  const { patientId, testId } = useParams();
  const [testItems, setTestItems] = useState([]);
  const [extractedAnswers, setExtractedAnswers] = useState([]);

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

  const fetchPatientTestAnswers = async (testId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTestAnswer/patient/${patientId}/test/${testId}`
      );
      if (response.ok) {
        const dataTestAnswers = await response.json();
        console.log("Patient test answers:", dataTestAnswers);

        const extractedAnswers = dataTestAnswers.patientTestAnswers.map(
          (answer) => ({
            testQuestionId: answer.testQuestionId,
            answer: answer.answer,
          })
        );

        console.log("Extracted answers:", extractedAnswers);
        setExtractedAnswers(extractedAnswers);
        return extractedAnswers;
      } else {
        console.error("Failed to fetch patient test answers");
        return null;
      }
    } catch (error) {
      console.error("Error fetching patient test answers:", error);
      return null;
    }
  };

  useEffect(() => {
    fetchTestItems(testId);
    fetchPatientTestAnswers(testId);
  }, [testId]);

  return (
    <div className="patient-dashboard therapist-dashboard view-test-therapist-page">
      <Tab.Container
        className="list-patient-dashboard"
        id="list-group-tabs"
        defaultActiveKey="#link4"
      >
        <TherapistMenu />
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
                    const patientAnswersForCurrentQuestion = extractedAnswers.filter(
                      (a) => item.testQuestionId === a.testQuestionId
                    );
                    const patientAnswers =
                      patientAnswersForCurrentQuestion.length > 0
                        ? patientAnswersForCurrentQuestion[0].answer
                        : [];
                    return (
                      <div key={index} className="question-container-test">
                        <div>
                          <h2>Question {questionIndex}</h2>
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
                                      className="patient-answer-checkbox"
                                      value={answer}
                                      defaultChecked={patientAnswers.includes(
                                        answer
                                      )}
                                      
                                    />
                                  )}
                                  {item.type === 1 && (
                                    <input
                                      type="checkbox"
                                      name={`question-${index}`}
                                      className="patient-answer-checkbox"
                                      value={answer}
                                      defaultChecked={patientAnswers.includes(
                                        answer
                                      )}
                                     
                                    />
                                  )}
                                  {item.type === 2 && (
                                    <input
                                      type="text"
                                      name={`question-${index}`}
                                      className="patient-answer-checkbox"
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

export default ViewCompletedTestTherapist;
