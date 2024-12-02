import React, { useState } from "react";
import "../styles/Header.css";

const Header = ({ onSearch }) => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city) {
      onSearch(city);
      setCity("");
    }
  };

  return (
    <div className="header">
      <h1>Weather Dashboard</h1>
      <div className="search-bar">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
};

export default Header;
