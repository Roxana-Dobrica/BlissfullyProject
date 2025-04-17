import React from "react";
import { useState } from "react";
import "./AddItemQuestionModal.css";

function AddItemQuestionModal({ onClose }) {
  const [questionType, setQuestionType] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleChangeOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleAddQuestion = (e) => {
    e.preventDefault();
    const questionData = {
      questionType,
      question,
      options: options.filter((option) => option.trim() !== ""),
    };
    onClose(questionData);
  };

  return (
    <div className="modal-overlay">
      <div className="background" onClick={onClose}></div>
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          ✖
        </button>
        <h2>Add question</h2>
        <form
          onSubmit={handleAddQuestion}
          className="form-modal-add-question-test"
        >
          <label>
            <p>Question type:</p>
            <select
              name="QuestionType"
              value={questionType}
              onChange={(e) => setQuestionType(parseInt(e.target.value))}
            >
              <option value="0">Single choice</option>
              <option value="1">Multiple choice</option>
              <option value="2">Free text</option>
            </select>
          </label>
          <label className="label-question-add-item">
            <p>Question:</p>
            <textarea
              name="Question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>
          {questionType !== 2 && (
            <div>
              <label>
                <p>Options:</p>
                {options.map((option, index) => (
                  <input
                    key={index}
                    type="text"
                    value={option}
                    onChange={(e) => handleChangeOption(index, e.target.value)}
                  />
                ))}
                <button
                  className="add-option-test-btn"
                  type="button"
                  onClick={handleAddOption}
                >
                  Add option
                </button>
              </label>
            </div>
          )}
          <div className="submit-modal-btn-container">
            <button
              className="submit-modal-btn submit-modal-add-question-test"
              type="submit"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddItemQuestionModal;
