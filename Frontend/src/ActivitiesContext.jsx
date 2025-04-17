import React, { createContext, useContext, useState } from 'react';

const ActivitiesContext = createContext();

export const useActivitiesContext = () => useContext(ActivitiesContext);

export const ActivitiesProvider = ({ children }) => {
  const [activities, setActivities] = useState([]);
  
  const updateActivity = (updatedActivity) => {
    setActivities(prevActivities =>
      prevActivities.map(activity =>
        activity.activityId === updatedActivity.activityId ? updatedActivity : activity
      )
    );
  };
  
  const contextValue = {
    activities,
    setActivities,
    updateActivity,
  };
  
  return (
    <ActivitiesContext.Provider value={contextValue}>
      {children}
    </ActivitiesContext.Provider>
  );
};