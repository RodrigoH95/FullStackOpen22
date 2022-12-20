import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("");

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleCountrySearch = (e) => {
    setCountryFilter(e.target.value);
  };

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

  const CountryList = () => {
    const countriesToShow = countryFilter
      ? countries.filter((country) =>
          country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
        )
      : countries;

    if (countriesToShow.length > 10) return countryFilter ? <p>Too many results</p> : <p>Search a country</p>;
    else if (countriesToShow.length > 1) {
      return countriesToShow.map((country) => <h2 key={country.name.common}>{country.name.common}</h2>);
    } else if (countriesToShow.length === 1) {
      return showCountryData(countriesToShow[0])
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
