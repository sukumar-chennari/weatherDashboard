import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import WeatherDisplay from "./components/WeatherDisplay";
import Favorites from "./components/Favorites";
import Forecast from "./components/Forecast";
import "./styles/App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [bgClass, setBgClass] = useState("");

  // Function to fetch weather data by city name
  const fetchWeather = async (city) => {
    const apiKey = "3fbfee0add6f67c23b4e7b25fd590df6";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

    try {
      const weatherResponse = await axios.get(weatherUrl);
      const forecastResponse = await axios.get(forecastUrl);

      if (weatherResponse.status === 200) {
        const weatherData = weatherResponse.data;

        setWeather({
          temp: weatherData.main.temp,
          city: weatherData.name,
          country: weatherData.sys.country,
          description: weatherData.weather[0].description,
          time: new Date().toLocaleTimeString(),
        });

        // Set background class based on temperature
        if (weatherData.main.temp < 0) setBgClass("cold-bg");
        else if (weatherData.main.temp < 20) setBgClass("mild-bg");
        else setBgClass("hot-bg");
      }

      if (forecastResponse.status === 200) {
        const forecastData = forecastResponse.data.list;

        // Filter forecast to include one entry per day
        const filteredForecast = [];
        const seenDates = new Set();

        forecastData.forEach((item) => {
          const date = item.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
          const time = item.dt_txt.split(" ")[1]; // Extract time (HH:mm:ss)

          // Pick midday data (12:00:00) or ensure only one entry per day
          if (!seenDates.has(date) && time.startsWith("12")) {
            filteredForecast.push({
              main: item.main,
              dt_txt: item.dt_txt,
              weather: item.weather,
            });
            seenDates.add(date);
          }
        });

        setForecast(filteredForecast);
      }
    } catch (error) {
      
      toast.error("Failed to fetch weather data!");
    }
  };

  // Function to fetch weather data based on the user's geolocation
  const fetchWeatherByLocation = async (lat, lon) => {
    const apiKey = "3fbfee0add6f67c23b4e7b25fd590df6";
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

    try {
      const weatherResponse = await axios.get(weatherUrl);
      const forecastResponse = await axios.get(forecastUrl);

      if (weatherResponse.status === 200) {
        const weatherData = weatherResponse.data;

        setWeather({
          temp: weatherData.main.temp,
          city: weatherData.name,
          country: weatherData.sys.country,
          description: weatherData.weather[0].description,
          time: new Date().toLocaleTimeString(),
        });

        // Set background class based on temperature
        if (weatherData.main.temp < 0) setBgClass("cold-bg");
        else if (weatherData.main.temp < 20) setBgClass("mild-bg");
        else setBgClass("hot-bg");
      }

      if (forecastResponse.status === 200) {
        const forecastData = forecastResponse.data.list;

        // Filter forecast to include one entry per day
        const filteredForecast = [];
        const seenDates = new Set();

        forecastData.forEach((item) => {
          const date = item.dt_txt.split(" ")[0]; // Extract date (YYYY-MM-DD)
          const time = item.dt_txt.split(" ")[1]; // Extract time (HH:mm:ss)

          // Pick midday data (12:00:00) or ensure only one entry per day
          if (!seenDates.has(date) && time.startsWith("12")) {
            filteredForecast.push({
              main: item.main,
              dt_txt: item.dt_txt,
              weather: item.weather,
            });
            seenDates.add(date);
          }
        });

        setForecast(filteredForecast);
      }
    } catch (error) {
      
      toast.error("Failed to fetch weather data!");
    }
  };

  // Get user's geolocation on component mount
  useEffect(() => {
    // Check if geolocation is available
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeatherByLocation(latitude, longitude);
        },
        (error) => {
          
          toast.error("Failed to get location!");
        }
      );
    } else {
      toast.error("Geolocation is not supported by this browser.");
    }

    fetchFavorites();
  }, []);

  // Fetch favorites from local API
  const fetchFavorites = async () => {
    try {
      const response = await axios.get("http://localhost:5000/favorites");
      if (response.status === 200) {
        setFavorites(response.data.map((item) => item.name));
      }
    } catch (error) {
      
    }
  };

  const addFavorite = async (city) => {
    try {
      // Check if the city is already in the database
      const response = await axios.get(`http://localhost:5000/favorites?name=${city}`);
      if (response.data.length === 0) {
        // Add the city to the database
        const newFavorite = { name: city };
        await axios.post("http://localhost:5000/favorites", newFavorite);
  
        // Update the state
        setFavorites([...favorites, city]);
        toast.success(`${city} added to favorites!`);
      } else {
        toast.error(`${city} is already in your favorites!`);
      }
    } catch (error) {
      
      toast.error(`Failed to add "${city}" to favorites.`);
    }
  };
  const removeFavorite = async (city) => {
    try {
      // Fetch the favorite by city name
      const response = await axios.get(`http://localhost:5000/favorites?name=${city}`);
  
      // Check if the city exists in the database
      if (response.data.length > 0) {
        const favoriteId = response.data[0].id; // Get the ID of the favorite
  
        // Delete the favorite by its ID
        await axios.delete(`http://localhost:5000/favorites/${favoriteId}`);
        toast.success(`${city} removed from favorites!`);
  
        // Update the state
        setFavorites(favorites.filter((fav) => fav !== city));
      } else {
        toast.error(`City "${city}" not found in favorites.`);
      }
    } catch (error) {
      
      toast.error(`Failed to remove "${city}" from favorites.`);
    }
  };
  
  

  return (
    <div className={`app-container`}>
      <Header onSearch={fetchWeather} />
      <WeatherDisplay weather={weather} onAddFavorite={addFavorite} />
      <Favorites
        favorites={favorites}
        onRemove={removeFavorite}
        onClick={fetchWeather}
      />
      <Forecast forecast={forecast} />
      <ToastContainer />
    </div>
  );
};

export default App;
