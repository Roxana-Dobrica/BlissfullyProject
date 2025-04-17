import React from "react";
import { useState, useEffect } from "react";
import { useUser } from "/src/UserContext";
import "./AllTestsPatient.css";
import { Link } from "react-router-dom";

function AllTestsPatient() {
  const [tests, setTests] = useState([]);
  const { user } = useUser();
  const [completedTests, setCompletedTests] = useState([]);

  const getPatientTests = async (patientId) => {
    try {
      const response = await fetch(
        `${
          import.meta.env.VITE_REACT_APP_API_ENDPOINT
        }/PatientTestAssignments/patient/${patientId}`
      );
      if (response.ok) {
        const data = await response.json();
        const testIds = data.patientTestAssignments.map(
          (assignment) => assignment.testId
        );
        const completedTestIds = data.patientTestAssignments
          .filter((assignment) => assignment.isCompleted)
          .map((assignment) => assignment.testId);
        setCompletedTests(completedTestIds);
        getTestsInfo(testIds);
      } else {
        console.error("Failed to fetch tests");
      }
    } catch (error) {
      console.error("Error fetching tests:", error);
    }
  };

  const getTestsInfo = async (testIds) => {
    try {
      const testsPromises = testIds.map(async (testId) => {
        const response = await fetch(
          `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Tests/${testId}`
        );
        if (response.ok) {
          return response.json();
        } else {
          console.error(`Failed to fetch test with ID ${testId}`);
          return null;
        }
      });
      const testsData = await Promise.all(testsPromises);
      const validTestsData = testsData.filter((test) => test !== null);
      setTests(validTestsData);
    } catch (error) {
      console.error("Error fetching test details:", error);
    }
  };

  useEffect(() => {
    if (user && user.nameid) {
      getPatientTests(user.nameid);
    }
  }, [user]);

  return (
    <div className="all-tests-patient-container">
      {user && user.nameid && tests.length > 0 ? (
        <div>
          <h1 className="all-tests-patient-title">All Tests</h1>
          <div className="table-all-tests-container-patient">
            <table className="table table-therapist-patients table-all-tests-patient">
              <thead>
                <tr>
                  <th scope="col">No.</th>
                  <th scope="col">Title</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {user &&
                  tests &&
                  tests.map((test, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{test.testTitle}</td>
                      <td className="button-cell-all-tests-patient">
                        {completedTests.includes(test.testId) ? (
                          <button
                            className="view-test-button-patient"
                            disabled
                            title="Completed"
                          >
                            &#10004;
                          </button>
                        ) : (
                          <Link
                            to={`/patient/test/${test.testId}`}
                            className="button-link-test"
                          >
                            <button
                              className="view-test-button-patient"
                              title="View"
                            >
                              <img
                                className="view-test-patient-image"
                                src="./images/view2.png"
                                alt="View"
                              />
                            </button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <p>No tests found</p>
      )}
    </div>
  );
}

export default AllTestsPatient;
