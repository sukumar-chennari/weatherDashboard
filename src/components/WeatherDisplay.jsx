import React from "react";
import "../styles/WeatherDisplay.css";

const WeatherDisplay = ({ weather, onAddFavorite }) => {
  if (!weather) return <div className="weather-display">No weather data available!</div>;

  const getBackgroundClass = () => {
    if (weather.temp < 0) {
      return "cold-bg";
    } else if (weather.temp >= 0 && weather.temp < 20) {
      return "mild-bg";
    } else {
      return "hot-bg";
    }
  };

  return (
    <div className={`weather-display ${getBackgroundClass()}`}>
      <h2>
        {weather.city}, {weather.country}
      </h2>
      <p>Temperature: {weather.temp}°C</p>
      <p>Description: {weather.description}</p>
      <p>Time: {weather.time}</p>
      <button onClick={() => onAddFavorite(weather.city)}>Add to Favorites</button>
    </div>
  );
};

export default WeatherDisplay;
