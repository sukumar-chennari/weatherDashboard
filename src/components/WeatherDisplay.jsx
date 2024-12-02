import React from "react";
import "../styles/WeatherDisplay.css";

const WeatherDisplay = ({ weather, onAddFavorite }) => {
  if (!weather) {
    return <h2>Search for a city to see the weather</h2>;
  }

  // Determine background class based on temperature
  const getBackgroundClass = (temp) => {
    if (temp <= 15) return "cold";
    if (temp > 15 && temp <= 30) return "mild";
    return "hot";
  };

  const backgroundClass = getBackgroundClass(weather.temp);

  return (
    <div className={`weather-display ${backgroundClass}`}>
      <div className="weather-info">
        <h2>{weather.city}, {weather.country}</h2>
        <p>{weather.description}</p>
        <h1>{weather.temp}°C</h1>
        <p>Last updated: {weather.time}</p>
        <button onClick={() => onAddFavorite(weather.city)}>Add to Favorites</button>
      </div>
    </div>
  );
};

export default WeatherDisplay;
