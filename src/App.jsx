import React, { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        console.log("Fetched countries:", data); // helpful for debugging
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    }

    fetchData();
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.common?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <h1>Country Flags Search</h1>

      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="searchBar"
      />

      <div className="cardsContainer">
        {filteredCountries.map((country) =>
          country.common && country.png ? (
            <div key={country.common} className="countryCard">
              <img src={country.png} alt={country.common} />
              <p>{country.common}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}

export default App;
