import React from "react";
import "../styles/Favorites.css";

const Favorites = ({ favorites, onRemove }) => {
  return (
    <div className="favorites">
      <h3>Your Favorite Cities</h3>
      {favorites.length === 0 ? (
        <p>No favorite cities yet!</p>
      ) : (
        <ul>
          {favorites.map((city, index) => (
            <li key={index}>
              {city}
              <button onClick={() => onRemove(city)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Favorites;
