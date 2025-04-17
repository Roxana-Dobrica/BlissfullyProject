export const deleteTestQuestions = async (testId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/TestQuestions/test/${testId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Test questions deleted");
    } else {
      console.error("Failed to delete test questions");
    }
  } catch (error) {
    console.error("Error deleting test questions:", error);
  }
};

export const deleteTestTexts = async (testId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/TestTexts/test/${testId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Test texts deleted");
    } else {
      console.error("Failed to delete test texts");
    }
  } catch (error) {
    console.error("Error deleting test texts:", error);
  }
};

export const deletePatientTestAssignments = async (testId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/PatientTestAssignments/test/${testId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Patient test assignments deleted");
    } else {
      console.error("Failed to delete patient test assignments");
    }
  } catch (error) {
    console.error("Error deleting patient test assignments:", error);
  }
};

export const deletePatientTestAnswers = async (testId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/PatientTestAnswer/test/${testId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      console.log("Patient test answers deleted");
    } else {
      console.error("Failed to delete patient test answers");
    }
  } catch (error) {
    console.error("Error deleting patient test answers:", error);
  }
};

export const deleteTest = async (testId) => {
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
