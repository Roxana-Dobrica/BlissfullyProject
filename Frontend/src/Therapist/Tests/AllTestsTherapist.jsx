import React from "react";
import "./AllTestsTherapist.css";
import { Link } from "react-router-dom";
import { useUser } from "/src/UserContext";
import { useEffect, useState } from "react";
import { deleteTestQuestions, deletePatientTestAnswers, deletePatientTestAssignments, deleteTestTexts } from "/src/Therapist/Tests/TestsService.jsx";

function AllTestsTherapist({ onViewTest }) {
  const { user } = useUser();
  const [tests, setTests] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [testToDelete, setTestToDelete] = useState(null);

  const getTherapistTests = async (therapistId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/Tests/therapist/${therapistId}`
      );
      if (response.ok) {
        const data = await response.json();
        if (data.tests && data.tests.length > 0) {
          setTests(data.tests);
        } else {
          setTests([]);
        }
      } else {
        console.error("Failed to fetch tests");
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  useEffect(() => {
    if (user && user.nameid) {
      getTherapistTests(user.nameid);
    }
  }, [user]);

  const handleViewTest = () => {
    onViewTest();
  };

  const handleDeleteTest = (testId) => {
    const testToDelete = tests.find(
      (test) => test.testId === testId
    );
    setTestToDelete(testToDelete);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteTest = () => {
    setTestToDelete(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDeleteTest = async () => {
    if (!testToDelete) return;

    try {
      const response = await fetch(
        `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Tests/${
          testToDelete.TestId
        }`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            testId: testToDelete.testId,
          }),
        }
      );

      if (response.ok) {
        setTests((prevEntries) =>
          prevEntries.filter(
            (test) =>
              test.testId !== testToDelete.testId
          ),
        );
        deleteTestQuestions(testToDelete.testId);
        deletePatientTestAnswers(testToDelete.testId);
        deletePatientTestAssignments(testToDelete.testId);
        deleteTestTexts(testToDelete.testId);
        setIsDeleteModalOpen(false);
      } else {
        console.error("Failed to delete test");
      }
    } catch (error) {
      console.error("Error deleting test:", error);
    }
  };

  const filteredTests = tests.filter((test) => {
    return test.testTitle.toLowerCase().includes(searchValue.toLowerCase());
  });

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="all-tests-page-container">
      <div className="top-section-therapist-tests-list">
        <h1 className="all-tests-page-title">Tests</h1>
        <button className="new-test-button">
          <Link to="/therapist/create-test" className="button-link-test">
            <p>Create new</p>
            <img
              src="./images/Patient/add.png"
              alt="add-icon"
              className="add-icon-journaling"
            />
          </Link>
        </button>
      </div>
      <div className="container-search-bar container-search-bar-patients">
        <form className="form-search search-patient-list" role="search">
          <input
            className="form-control me-2 form-resources-search"
            type="text"
            placeholder="Search"
            aria-label="Search"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </form>
      </div>
      <table className="table table-therapist-patients">
        <thead>
          <tr>
            <th scope="col">No.</th>
            <th scope="col">Title</th>
            <th scope="col"></th>
          </tr>
        </thead>
        <tbody>
          {filteredTests.length === 0 ? (
            <tr>
              <td colSpan="6">No tests</td>
            </tr>
          ) : (
            user &&
            filteredTests &&
            filteredTests.map((test, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{test.testTitle}</td>
                <td>
                  <div className="all-tests-therapist-buttons-container">
                    <Link
                      to={`/therapist/test/${test.testId}`}
                      className="button-link-test"
                    >
                      <button className="view-test-button">View</button>
                    </Link>
                    <button
                      className="delete-test-table-button"
                      onClick={() => {
                        handleDeleteTest(test.testId);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {isDeleteModalOpen && testToDelete && (
        <div className="modal-overlay modal-overlay-delete-feedback">
          <div
            className="background"
            onClick={handleCloseDeleteTest}
          ></div>
          <div className="modal-content modal-content-delete-feedback">
            <h2>Delete Test</h2>
            <p>Are you sure you want to delete this test?</p>
            <div className="delete-feedback-modal-buttons">
              <button
                className="cancel-delete-feedback"
                onClick={handleCloseDeleteTest}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-feedback"
                onClick={confirmDeleteTest}
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

export default AllTestsTherapist;
