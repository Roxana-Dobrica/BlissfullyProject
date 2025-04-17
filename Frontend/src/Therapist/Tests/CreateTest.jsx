import React from "react";
import { useState, useEffect } from "react";
import AddItemTextModal from "./AddItemTextModal";
import AddItemQuestionModal from "./AddItemQuestionModal";
import "./CreateTest.css";
import Tab from "react-bootstrap/Tab";
import { useUser } from "/src/UserContext";
import {
  NotificationManager,
  NotificationContainer,
} from "react-notifications";
import { useNavigate } from "react-router-dom";
import TherapistMenu from "/src/TherapistMenu";

function CreateTest() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddItemTextModal, setShowAddItemTextModal] = useState(false);
  const [showAddItemQuestionModal, setShowAddItemQuestionModal] = useState(
    false
  );
  const [questions, setQuestions] = useState([]);
  const [texts, setTexts] = useState([]);
  const [items, setItems] = useState([]);
  const { user: userData } = useUser();
  const [testTitle, setTestTitle] = useState("");
  const [testId, setTestId] = useState(null);
  const [activeTab, setActiveTab] = useState("#link4");

  const navigate = useNavigate();

  useEffect(() => {
    if (userData) {
      console.log("User data id:", userData.nameid);
    }
  }, [userData]);

  const handleAddTest = async () => {
    if (questions.length === 0) {
      NotificationManager.error(
        "Please add at least one question to the test",
        "Error"
      );
      return;
    }

    try {
      const dataToSend = {
        therapistId: userData.nameid,
        testTitle: testTitle,
      };

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/tests`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );
      if (response.ok) {
        const responseData = await response.json();
        const testId = responseData.test.testId;
        setTestId(testId);
        let order = 1;
        for (const item of items) {
          if (item.type === "question") {
            await handleSaveQuestion(testId, item.data, order);
          } else if (item.type === "text") {
            await handleSaveText(testId, item.data, order);
          }
          order++;
        }
        NotificationManager.success("Test added successfully");
        console.log("Test added successfully");
      } else {
        const responseData = await response.json();
        if (responseData && responseData.validationsErrors) {
          console.error("Failed to add test:", responseData.validationsErrors);
          NotificationManager.error(responseData.validationsErrors[0], "Error");
        }
      }
    } catch (error) {
      console.error("Error adding test:", error);
      NotificationManager.error(responseData.validationsErrors[0], "Error");
    }
    navigate("/therapist/#link4");
  };

  const handleTitleChange = (event) => {
    setTestTitle(event.target.value);
  };

  const openDropdown = () => {
    setShowDropdown(true);
  };

  const closeDropdown = () => {
    setShowDropdown(false);
  };

  const handleAddItemButtonClick = () => {
    if (showDropdown) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const handleAddItemTextButtonClick = () => {
    setShowAddItemTextModal(true);
    closeDropdown();
  };

  const handleAddItemQuestionButtonClick = () => {
    setShowAddItemQuestionModal(true);
    closeDropdown();
  };

  const handleAddQuestion = (questionData) => {
    console.log("questionData:", questionData);
    if (
      questionData &&
      (questionData.questionType === 2 ||
        (questionData.question !== "" && questionData.options.length > 0))
    ) {
      setItems([...items, { type: "question", data: questionData }]);
      setQuestions([...questions, questionData]);
    } else {
      NotificationManager.error(
        "Please fill all the fields for the question",
        "Error"
      );
    }
  };

  const handleAddText = (text) => {
    console.log("Textul introdus:", text);
    setItems([...items, { type: "text", data: text }]);
    setTexts([...texts, text]);
    setShowAddItemTextModal(false);
  };

  const handleSaveQuestion = async (testId, questionData, order) => {
    try {
      const dataToSend = {
        testId: testId,
        question: questionData.question,
        type: questionData.questionType,
        answers: questionData.options || [],
        order: order,
      };

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/testQuestions`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
      } else {
        const responseData = await response.json();
        if (responseData && responseData.validationsErrors) {
          NotificationManager.error(responseData.validationsErrors[0], "Error");
        }
      }
    } catch (error) {
      NotificationManager.error(responseData.validationsErrors[0], "Error");
    }
  };

  const handleSaveText = async (testId, text, order) => {
    try {
      const dataToSend = {
        testId: testId,
        text: text,
        order: order,
      };

      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/testTexts`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dataToSend),
        }
      );

      if (response.ok) {
        navigate("/therapist/tests");
      } else {
        const responseData = await response.json();
        if (responseData && responseData.validationsErrors) {
          NotificationManager.error(responseData.validationsErrors[0], "Error");
          console.error("Failed to add text:", responseData.validationsErrors);
        }
      }
    } catch (error) {
      NotificationManager.error(responseData.validationsErrors[0], "Error");
      console.error("Error adding text:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Authentication/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        console.error("Failed to logout");
      }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteItem = (indexToDelete) => {
    const updatedItems = items.filter((_, index) => index !== indexToDelete);
    setItems(updatedItems);

    const updatedQuestions = questions.filter(
      (_, index) => index !== indexToDelete
    );
    setQuestions(updatedQuestions);

    const updatedTexts = texts.filter((_, index) => index !== indexToDelete);
    setTexts(updatedTexts);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="patient-dashboard therapist-dashboard create-test-page">
      <Tab.Content className="create-test-therapist-tab">
        <TherapistMenu />
      </Tab.Content>
      <NotificationContainer />
      <Tab.Content className="tab-content-wrapper">
        <div className="create-test-container">
          <h1>Create Test</h1>
          <div className="created-test-container">
            <div className="test-title">
              <label>
                <p>Title: </p>
                <input
                  type="text"
                  value={testTitle}
                  onChange={handleTitleChange}
                />
              </label>
            </div>
            {items &&
              items.length > 0 &&
              items.map((item, index) => {
                if (item.type === "question") {
                  const questionIndex = items
                    .slice(0, index + 1)
                    .filter((item) => item.type === "question").length;
                  return (
                    <div key={index} className="question-container-test">
                      <div>
                        <div className="top-section-question">
                          <h2>Question {questionIndex}</h2>
                          <button
                            className="delete-question-item-btn"
                            onClick={() => handleDeleteItem(index)}
                          >
                            ✖
                          </button>
                        </div>
                        <p className="question">{item.data.question}</p>
                        <div className="question-options">
                          {item.data.questionType === 0 && (
                            <ul>
                              {item.data.options &&
                                item.data.options.map((option, optionIndex) => (
                                  <li key={optionIndex}>
                                    <input
                                      type="radio"
                                      name={`question-${index}`}
                                      value={option}
                                    />
                                    {option}
                                  </li>
                                ))}
                            </ul>
                          )}
                          {item.data.questionType === 1 && (
                            <ul>
                              {item.data.options &&
                                item.data.options.map((option, optionIndex) => (
                                  <li key={optionIndex}>
                                    <input
                                      type="checkbox"
                                      name={`question-${index}`}
                                      value={option}
                                    />
                                    {option}
                                  </li>
                                ))}
                            </ul>
                          )}
                          {item.data.questionType === 2 && (
                            <input type="text" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                } else {
                  return (
                    <div key={index} className="text-container-test">
                      <p>{item.data}</p>
                      <button
                        className="delete-question-item-btn"
                        onClick={() => handleDeleteItem(index)}
                      >
                        ✖
                      </button>
                    </div>
                  );
                }
              })}
            <div className="buttons-container-test">
              <div className="dropdown-add-item">
                <button
                  className="dropdown-add-item-btn"
                  onClick={handleAddItemButtonClick}
                >
                  Add Item
                </button>
                {showDropdown && (
                  <div className="dropdown-content-add-item-test">
                    <button onClick={handleAddItemQuestionButtonClick}>
                      Question
                    </button>
                    <button onClick={handleAddItemTextButtonClick}>
                      {" "}
                      Text
                    </button>
                  </div>
                )}
              </div>
              <div>
                <button className="save-test-btn" onClick={handleAddTest}>
                  Save Test
                </button>
              </div>
            </div>
          </div>
          {showAddItemTextModal && (
            <AddItemTextModal
              onClose={() => setShowAddItemTextModal(false)}
              onSubmit={handleAddText}
            />
          )}
          {showAddItemQuestionModal && (
            <AddItemQuestionModal
              onClose={(questionData) => {
                setShowAddItemQuestionModal(false);
                handleAddQuestion(questionData);
              }}
            />
          )}
        </div>
      </Tab.Content>
    </div>
  );
}

export default CreateTest;
