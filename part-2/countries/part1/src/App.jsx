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
  if (countries.length > 10) {
    return <p>Too many matches, specify another filter</p>;
  }

  return (
    <ul>
      {countries.map((country) => (
        <CountryListItem key={country.name.common} country={country} />
      ))}
    </ul>
  );
};

const CountryListItem = ({ country, fetchWeather, city }) => {
  const [weather, setWeather] = useState();

  useEffect(() => {
    const fetchWeather = (city) => {
      const api_key = import.meta.env.VITE_SOME_KEY;

      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
      axios
        .get(url)
        .then((response) => {
          setWeather(response.data);
        })
        .catch((error) => {
          console.error("Error fetching weather data:", error);
        });
    };

    fetchWeather(country.capital);
  }, [country.name.common]);

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
      {weather && (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>Temperature: {(weather.main.temp - 273.15).toFixed(2)}°C</p>
          <img
            alt="weather icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          />
          <p>Wind: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [search, setSearch] = useState("");
  const [countries, setAllCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        setAllCountries(response.data);
      });
  }, []);

  const filtered = countries.filter((country) =>
    country.name.common.toUpperCase().includes(search.toUpperCase())
  );

  return (
    <>
      <InputFilter value={search} setSearch={setSearch} />
      {search && <CountryList countries={filtered} />}
    </>
  );
};

export default App;
