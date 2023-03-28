import "./App.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
// Imports end

function App() {
  const [activeLocation, setActiveLocation] = useState("AB");
  const [lastUpdated, setlastUpdated] = useState("");
  const COVID_URL = "https://api.opencovid.ca";

  const locationList = [
    { value: "AB", label: "Alberta" },
    { value: "BC", label: "British Columbia" },
    { value: "MB", label: "Manitoba" },
    { value: "NB", label: "New Brunswick" },
    { value: "NL", label: "Newfoundland and Labrador" },
    { value: "NT", label: "Northwest Territories" },
    { value: "NS", label: "Nova Scotia" },
    { value: "NU", label: "Nunavut" },
    { value: "ON", label: "Ontario" },
    { value: "PE", label: "Prince Edward Island" },
    { value: "QC", label: "Quebec" },
    { value: "SK", label: "Saskatchewan" },
    { value: "YT", label: "Yukon" },
  ];

  useEffect(() => {
    getVersion();
  }, [activeLocation]);

  const getVersion = async () => {
    const response = await axios.get(`${COVID_URL}/version`);
    setlastUpdated(response?.data?.timeseries);
  };

  return (
    <div className="App">
      <h1>COVID 19 Dashboard </h1>
      <div className="dashboard-container">
        <div className="dashboard-menu ">
          <Select
            options={locationList}
            onChange={(selectedOption) =>
              setActiveLocation(selectedOption.value)
            }
            defaultValue={locationList.filter(
              (options) => options.value === activeLocation
            )}
            className="dashboard-select"
          />
          <p className="update-date">Last Updated : {lastUpdated}</p>
        </div>
        <div className="dashboard-summary"></div>
      </div>
    </div>
  );
}

export default App;
