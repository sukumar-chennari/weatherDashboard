import React from "react";
import "../styles/Forecast.css";

const Forecast = ({ forecast }) => {
  if (!forecast || forecast.length === 0) return <div className="forecast">No forecast data available!</div>;

  const getBackgroundClass = (temp) => {
    if (temp < 0) {
      return "cold-bg";
    } else if (temp >= 0 && temp < 20) {
      return "mild-bg";
    } else {
      return "hot-bg";
    }
  };

  return (
    <div className="forecast-container">
      {forecast.map((day, index) => {
        
        if (!day.main || !day.main.temp || !day.weather || !day.weather[0]) {
          return (
            <div key={index} className="forecast-day error">
              <p>Invalid data</p>
            </div>
          );
        }

        return (
          <div key={index} className={`forecast-day ${getBackgroundClass(day.main.temp)}`}>
            <p>{new Date(day.dt_txt).toLocaleDateString()}</p>
            <p>Temp: {day.main.temp}°C</p>
            <p>{day.weather[0].description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Forecast;
