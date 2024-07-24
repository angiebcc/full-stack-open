import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";

const InputFilter = ({ search, setSearch }) => {
  return (
    <>
      <div>
        <p> find countries: </p>
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          placeholder="Search by name"
        />
      </div>
    </>
  );
};

const CountryList = ({ countries }) => {
  return (
    <ul>
      {countries.map((country) => (
        <CountryListItem key={country.name.common} country={country} />
      ))}
    </ul>
  );
};

const CountryListItem = ({ country }) => {
  return (
    <div>
      <h1> {country.name.common} </h1>
      <p>
        Capital: {country.capital} <br />
        Area: {country.area}
      </p>
      {country.languages ? (
        <ul>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
        </ul>
      ) : (
        <p>No language data available</p>
      )}
      <img src={country.flags.png} alt="flag" height="200" width="250" />{" "}
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setAllCountries] = useState([]);

  const handleCountryChange = (event) => {
    setAllCountries(event.target.value);
  };

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        console.log(response);
        setAllCountries(response.data);
      });
  }, []);

  const filteredContries = () => {
    if (search === "") {
      return [];
    }

    const filtered = countries.filter((country) =>
      country.name.common.toUpperCase().includes(search.toUpperCase())
    );

    if (filtered.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
    if (filtered.length === 1) {
      return <CountryListItem country={filtered[0]} />;
    }

    return <CountryList countries={filtered} />;
  };

  // const searchCountry = () => {
  //   if (search !== "") {
  //     axios
  //       .get("https://studies.cs.helsinki.fi/restcountries/api/all")
  //       .then(() => {
  //         setAllCountries(
  //           countries.filter((country) =>
  //             country.name.toLowerCase().includes(search.toLowerCase())
  //           )
  //         );
  //         setAllCountries(search);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching countries:", error);
  //       });
  //   }
  // };

  return (
    <>
      <InputFilter value={search} setSearch={setSearch} />
      {filteredContries()}
    </>
  );
};

export default App;
