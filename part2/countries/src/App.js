import { useEffect, useState } from "react";
import axios from "axios"
import CountryList from './components/CountryList';

function App() {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState("")

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleCountrySearch = (e) => {
    setCountryFilter(e.target.value);
  };

  const countriesToShow = countryFilter
  ? countries.filter((country) =>
      country.name.common.toLowerCase().includes(countryFilter.toLowerCase())
    )
  : countries;

  return (
    <>
      Find country:
      <input value={countryFilter} onChange={handleCountrySearch}></input>
      <CountryList countries={countriesToShow} filter={countryFilter} />
    </>
  );
}

export default App;
