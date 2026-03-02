import { useState, useEffect } from "react";
import archive11729 from "../../../server/app/database/openMeteoCache/archive11729.json";

const FrostDates = () => {
  const [frostDates, setFrostDates] = useState(null);

  useEffect(() => {
    const data = archive11729;

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
    console.log(dates[0]);
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
    const FALL_START_MONTH = 7;
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

    setFrostDates({
      lastSpringFrost: doyToMonthDay(lastSpringDOY),
      firstFallFrost: doyToMonthDay(firstFallDOY),
    });
  }, []);

  if (!frostDates) {
    return <div>Loading frost dates...</div>;
  }

  return (
    <div>
      <p>
        Last spring frost: {frostDates.lastSpringFrost.month}{" "}
        {frostDates.lastSpringFrost.day}
      </p>
      <p>
        First fall frost: {frostDates.firstFallFrost.month}{" "}
        {frostDates.firstFallFrost.day}
      </p>
    </div>
  );
};

export default FrostDates;
