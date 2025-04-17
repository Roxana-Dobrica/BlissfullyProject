import React, { useState } from "react";
import PatientDashboard from "./PatientDashboard";
import PatientSettings from "./PatientSettings";
import "./Patient.css";

function Patient() {
  const [activeTab, setActiveTab] = useState("PatientDashboard");
}

export default Patient;
