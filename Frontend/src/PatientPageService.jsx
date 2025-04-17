export const fetchPatientActivities = async (patientId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/activities/patient/${patientId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch patient activities");
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient activities:", error);
    return null;
  }
};

export const fetchPatientNotes = async (patientId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/notes/patient/${patientId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch patient notes");
      return null;
    }
  } catch (error) {
    console.error("Error fetching patient notes:", error);
    return null;
  }
};

export const fetchPatientResourcesByCategory = async (patientId, category) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/materials/patient/${patientId}/type/${category}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch resources");
      return null;
    }
  } catch (error) {
    console.error("Error fetching resources:", error);
    return null;
  }
};

export const fetchPatientTests = async (patientId) => {
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
      return { testIds, completedTestIds };
    } else {
      console.error("Failed to fetch tests");
      return null;
    }
  } catch (error) {
    console.error("Error fetching tests:", error);
    return null;
  }
};

export const fetchTestsInfo = async (testIds) => {
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
    return validTestsData;
  } catch (error) {
    console.error("Error fetching test details:", error);
    return null;
  }
};

export const fetchPatientMusic = async (patientId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/Materials/patient/${patientId}/type/${0}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch music");
      return null;
    }
  } catch (error) {
    console.error("Error fetching music:", error);
    return null;
  }
};

export const fetchPatientVideos = async (patientId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/Materials/patient/${patientId}/type/${1}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch videos");
      return null;
    }
  } catch (error) {
    console.error("Error fetching videos:", error);
    return null;
  }
};

export const fetchPatientReading = async (patientId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/Materials/patient/${patientId}/type/${2}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch books");
      return null;
    }
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
};

export const fetchPatientPodcasts = async (patientId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/Materials/patient/${patientId}/type/${3}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch podcasts");
      return null;
    }
  } catch (error) {
    console.error("Error fetching podcasts:", error);
    return null;
  }
};

export const fetchTherapistFeedbacks = async (patientId) => {
  try {
    const response = await fetch(
      `${
        import.meta.env.VITE_REACT_APP_API_ENDPOINT
      }/TherapistFeedbacks/patient/${patientId}`
    );
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch feedback");
      return null;
    }
  } catch (error) {
    console.error("Error fetching feedback:", error);
    return null;
  }
};

export const deleteActivity = async (activityId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Activities/${activityId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ activityId }), 
      }
    );
    if (response.ok) {
      return true;
    } else {
      console.error("Failed to delete activity");
      return false;
    }
  } catch (error) {
    console.error("Error deleting activity:", error);
    return false;
  }
};

export const deleteNote = async (noteId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Notes/${noteId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ noteId }),
      }
    );
    if (response.ok) {
      return true;
    } else {
      console.error("Failed to delete note");
      return false;
    }
  } catch (error) {
    console.error("Error deleting note:", error);
    return false;
  }
};

export const deleteResource = async (materialId) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_REACT_APP_API_ENDPOINT}/Materials/${materialId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ materialId }),
      }
    );
    if (response.ok) {
      return true;
    } else {
      console.error("Failed to delete resource");
      return false;
    }
  } catch (error) {
    console.error("Error deleting resource:", error);
    return false;
  }
};
