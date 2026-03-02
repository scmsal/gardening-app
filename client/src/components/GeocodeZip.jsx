// import SearchBar from "./SearchBar";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

const GeocodeZip = () => {
  const [zipInput, setZipInput] = useState("");
  const [geoResults, setGeoResults] = useState();
  const [geoHistoricalData, setGeoHistoricalData] = useState();
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
      setGeoResults({
        lat: res.latitude,
        lng: res.longitude,
        elevation: res.elevation,
        city: res.name,
        state: res.admin1, //Note: additional info available like county, country
      });
      //can't I use lat and lng from setResults? Or it won't update in time? So then when am I using that state?
      const forecastURL = `https://api.open-meteo.com/v1/forecast?latitude=${res.latitude}&longitude=${res.longitude}&hourly=temperature_2m,soil_temperature_0cm,soil_temperature_6cm,soil_temperature_18cm&wind_speed_unit=mph&temperature_unit=fahrenheit&precipitation_unit=inch`;
      const forecastRes = await fetch(forecastURL);
      const forecastData = await forecastRes.json();
      console.log("forecast data:", forecastData);
      getHistoricalData(res.latitude, res.longitude);
    }
  };

  async function getHistoricalData(lat, long) {
    const historicalURL = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${long}&start_date=1991-01-01&end_date=2020-12-31&daily=temperature_2m_min&timezone=auto&temperature_unit=fahrenheit&precipitation_unit=inch`;

    const response = await fetch(historicalURL);

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();

    if (
      !data ||
      !data.daily ||
      !data.daily.time ||
      data.daily.time.length === 0
    ) {
      setFrostDates(null);
      return;
    }

    const dates = data.daily.time;
    const tmins = data.daily.temperature_2m_min || [];

    const byYear = {};

    dates.forEach((dateStr, i) => {
      const year = dateStr.slice(0, 4);
      if (!byYear[year]) byYear[year] = [];
      byYear[year].push({
        date: dateStr,
        tmin: tmins[i],
      });
    });

    //Compute last spring frost per year
    //Last day Jan–Jun where Tmin ≤ 32°F
    const SPRING_CUTOFF_MONTH = 6; // June
    const FROST_THRESHOLD = 32;
    function getLastSpringFrost(yearData) {
      const springDays = yearData.filter((d) => {
        const month = new Date(d.date).getMonth() + 1;
        return month <= SPRING_CUTOFF_MONTH && d.tmin <= FROST_THRESHOLD;
      });

      if (!springDays.length) return null;

      return springDays[springDays.length - 1].date;
    }

    const lastSpringFrosts = Object.values(byYear)
      .map(getLastSpringFrost)
      .filter(Boolean);

    //Compute first fall frost per year
    //First day Jul–Dec where Tmin ≤ 32°F

    const FALL_START_MONTH = 7;

    function getFirstFallFrost(yearData) {
      const fallDays = yearData.filter((d) => {
        const month = new Date(d.date).getMonth() + 1;
        return month >= FALL_START_MONTH && d.tmin <= FROST_THRESHOLD;
      });

      if (!fallDays.length) return null;

      return fallDays[0].date;
    }

    const firstFallFrosts = Object.values(byYear)
      .map(getFirstFallFrost)
      .filter(Boolean);

    //Convert dates → day-of-year (DOY) for percentile math
    function toDayOfYear(dateStr) {
      const date = new Date(dateStr);
      const start = new Date(date.getFullYear(), 0, 0);
      return Math.floor((date - start) / 86400000);
    }
    const springDOYs = lastSpringFrosts.map(toDayOfYear).sort((a, b) => a - b);
    const fallDOYs = firstFallFrosts.map(toDayOfYear).sort((a, b) => a - b);

    //Take percentiles

    function percentile(arr, p) {
      const idx = Math.floor(p * (arr.length - 1));
      return arr[idx];
    }

    const lastSpringDOY = percentile(springDOYs, 0.7);
    const firstFallDOY = percentile(fallDOYs, 0.3); // early frost risk

    //Convert DOY → month/day

    function doyToMonthDay(doy, year = 2001) {
      const date = new Date(year, 0);
      date.setDate(doy);
      return {
        month: date.toLocaleString("en-US", { month: "long" }),
        day: date.getDate(),
      };
    }
    const lastSpringFrost = doyToMonthDay(lastSpringDOY);
    const firstFallFrost = doyToMonthDay(firstFallDOY);

    //for caching
    // const latKey = lat.toFixed(3);
    // const lonKey = long.toFixed(3);

    console.log("Last spring frost:", lastSpringFrost);
    console.log("First fall frost:", firstFallFrost);
    setFrostDates({ lastSpringFrost, firstFallFrost });
  }

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
        {geoResults && (
          <div>
            <p>
              {geoResults.city}, {geoResults.state}
            </p>
            <p>elevation: {geoResults.elevation}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default GeocodeZip;
