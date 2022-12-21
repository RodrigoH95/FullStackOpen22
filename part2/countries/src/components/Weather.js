import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=metric`
      )
      .then((response) => {
        setCurrentWeather(response.data);
      });
  }, []);

  return (
    <div>
      <h2>Weather in {city}</h2>
      {currentWeather && (
        <div>
          <p>Temperature: {currentWeather.main.temp} °C</p>
          <img
            src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}
            alt="weather"
          ></img>
          <p>Wind: {currentWeather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
