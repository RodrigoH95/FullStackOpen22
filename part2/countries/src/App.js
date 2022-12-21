import { useEffect, useState } from "react";
import axios from "axios";

const Weather = ({ city }) => {
  const [currentWeather, setCurrentWeather] = useState(null);
  const api_key = process.env.REACT_APP_API_KEY;

  useEffect(() => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${api_key}&units=metric`)
      .then(response => {
        setCurrentWeather(response.data);
      })
  }, []);

  return (
    <div>
      <h2>Weather in {city}</h2>
      {currentWeather && 
      <div>
        <p>Temperature: {currentWeather.main.temp} °C</p>
        <img src={`http://openweathermap.org/img/wn/${currentWeather.weather[0].icon}@2x.png`}></img>
        <p>Wind: {currentWeather.wind.speed} m/s</p>
      </div>}
    </div>
  )

}

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");
  const [show, setShow] = useState(new Uint8Array(0));

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleCountrySearch = (e) => {
    setCountryFilter(e.target.value);
  };

  const toggleCountry = (index) => {
    const copy = [...show];
    copy[index] = !show[index]
    setShow(copy);
  }
 
  const showCountryData = (country) => (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital[0]}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.keys(country.languages).map((language) => (
          <li key={language}>{country.languages[language]}</li>
        ))}
      </ul>
      <img src={country.flags.png}></img>
    </div>
  );


  const countriesToShow = countryFilter
  ? countries.filter((country) =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    )
  : countries;

  const CountryList = () => {
    if (countriesToShow.length > 10) return countryFilter ? <p>Too many results</p> : <p>Search a country</p>;
    else if (countriesToShow.length > 1) {
      return countriesToShow.map((country) => {  
        const i = countries.indexOf(country);   
        return (
          <div key={country.name.common}>
            <h2>{country.name.common} <button onClick={() => toggleCountry(i)}>{show[i] ? "Hide" : "Show"}</button></h2>
            {Boolean(show[i]) && showCountryData(country)}
          </div>
        )
    });
    } else if (countriesToShow.length === 1) {
      return (
        <div>
          {showCountryData(countriesToShow[0])}
          <Weather city={countriesToShow[0].capital[0]} />
        </div>
      )
    }
  };

  return (
    <>
      Find country:
      <input value={countryFilter} onChange={handleCountrySearch}></input>
      <CountryList />
    </>
  );
}

export default App;
