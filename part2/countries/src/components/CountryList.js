import { useState } from "react";
import Country from "./Country";
import Weather from "./Weather";

const CountryList = ({ countries, filter }) => {
  const [show, setShow] = useState(new Uint8Array(countries.length));

  const toggleCountry = (index) => {
    const copy = [...show];
    copy[index] = !show[index]
    setShow(copy);
}

  if (countries.length > 10) return <p>{filter ? "Too many results" : "Search a country"}</p>
  else if (countries.length > 1) {
    return countries.map(c => {
      const i = countries.indexOf(c);
      return (
        <div key={c.name.common}>
          <h2>
            {c.name.common}
            <button onClick={() => toggleCountry(i)}>
              {show[i] ? "Hide" : "Show"}
            </button>
          </h2>
          {Boolean(show[i]) && <Country country={c} />}
        </div>
      );
    });
  } else if (countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]} />
        <Weather city={countries[0].capital[0]} />
      </div>
    );
  }
};

export default CountryList;
