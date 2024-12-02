import React from "react";
import "../styles/Forecast.css";

const Forecast = ({ forecast }) => {
  return (
    <div className="forecast">
      <h3>5-Day Forecast</h3>
      {forecast.length === 0 ? (
        <p>Loading forecast...</p>
      ) : (
        <div className="forecast-cards">
          {forecast.map((day, index) => (
            <div className="forecast-card" key={index}>
              <div className="date">
                {new Date(day.dt * 1000).toLocaleDateString()}
              </div>
              <div className="temperature">
                <h4>{Math.round(day.main.temp)}°C</h4>
              </div>
              <div className="weather-description">
                <p>{day.weather[0].description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Forecast;
