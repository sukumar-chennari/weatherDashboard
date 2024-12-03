
Weather Dashboard Application

This Weather Dashboard is a React application that provides real-time weather updates, a 5-day forecast, and allows users to manage their favorite cities. The application uses the OpenWeatherMap API for fetching weather data and a JSON server for managing favorite cities.

Features:
-> Display current weather (temperature, description, city, country).
-> Display a 5-day weather forecast.
-> Add and remove cities from the favorites list.
-> Dynamically styled UI based on temperature (hot, mild, cold backgrounds).

Live Link: https://effortless-wisp-1d6faa.netlify.app/

Prerequisites
-> Ensure you have the following installed on your machine:
    Node.js (16 or higher)
    Git
    A text editor or IDE (e.g., Visual Studio Code).


Setup Instructions:
Follow these steps to set up and run the application:

Step 1: Clone the Repository
    1. git clone https://github.com/sukumar-chennari/weatherDashboard.git
    2. cd weatherDashboard

Step 2: Install Dependencies
Run the following command in the terminal to install all required dependencies:
        npm install

Step 3: Obtain an OpenWeatherMap API Key

        1. Visit the OpenWeatherMap API website.
        2. Sign up or log in to your account.
        3. Navigate to the API Keys section.
        4. Generate a new API key (it will be used in the application).

Step 4: Set Up the JSON Server

        1. Install JSON Server globally if you don’t already have it
            npm install -g json-server
        2. Start the JSON server
            json-server --watch db.json --port 5000

        Ensure the db.json file is present in the project folder and contains the following structure:
        {
            "favorites": []
        }  

Step 5: Start the React Application
Run the following command to start the application:
        npm run dev

Usage:

1. Search for a city using the search bar.
2. View current weather details and the 5-day forecast.
3. Add cities to your favorites list for quick access.
4. Remove cities from your favorites list when needed.


Notes:

1. Ensure the JSON server is running before interacting with the favorites feature.
2. The API key is mandatory to fetch weather data. If invalid or missing, the app will not function correctly.
