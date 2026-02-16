// import SearchBar from "./SearchBar";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const GeocodeZip = () => {
  const [zipInput, setZipInput] = useState("");
  const [results, setResults] = useState();
  const [elevation, setElevation] = useState();

  //put frost dates into store?
  const [frostDates, setFrostDates] = useState();
  const handleZipInput = (e) => {
    setZipInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${zipInput}&count=1&language=en&format=json`,
    );
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const res = data.results[0];
      console.log("handleSubmit res:", res);
      setResults({
        lat: res.latitude,
        lng: res.longitude,
        city: res.name,
        state: res.admin1,
      });
      //can't I use lat and lng from setResults? Or it won't update in time? So then when am I using that state?
      const forecastURL = `https://api.open-meteo.com/v1/forecast?latitude=${res.latitude}&longitude=${res.longitude}&hourly=temperature_2m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
      const forecastRes = await fetch(forecastURL);
      const forecastData = await forecastRes.json();
      console.log("forecase data:", forecastData);

      const frostDatesURL = `https://farmsense.net/api/frost-date-api/`;

      const elevationURL = `https://api.open-elevation.com/api/v1/lookup?locations=${res.latitude},${res.longitude}`;
      const elevationRes = await fetch(elevationURL);
      const elevationData = await elevationRes.json();
      console.log("elevation all:", elevationData);
      console.log("elevation only:", elevationData.results[0].elevation);
      setElevation(elevationData.results[0].elevation);
    }
  };
  return (
    <>
      <div>
        <h3>Find City and State by zip code</h3>
        {/* <SearchBar /> */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your zip code"
            value={zipInput}
            onChange={handleZipInput}
          />
          <button type="submit">
            <FaSearch />
          </button>
        </form>
        {results && (
          <div>
            <p>
              {results.city}, {results.state}
            </p>
            <p>elevation: {elevation}</p>
          </div>
        )}
      </div>
      <div>
        <h3>Frost dates </h3>
      </div>
    </>
  );
};

export default GeocodeZip;
