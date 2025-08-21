import { useDispatch, useSelector } from "react-redux";
import { fetchHardinessZone } from "../features/zoneSlice";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const FindZoneByZip = () => {
  const dispatch = useDispatch();
  const { zone, loading, error } = useSelector((state) => state.hardinessZone);
  const [zipInput, setZipInput] = useState("");

  const handleSearch = (zipCode) => {
    setZipInput(zipCode);
    dispatch(fetchHardinessZone(zipCode));
  };

  return (
    <div className="w-50">
      <SearchBar
        onSearch={handleSearch}
        placeholder="Enter zip code"
        label="Find my zone:"
      />
      <div className="text-end">
        <span>Powered by </span>{" "}
        <a
          href="https://rapidapi.com/fireside-worldwide-fireside-worldwide-default/api/plant-hardiness-zone"
          target="_blank"
          rel="noopener noreferrer"
          className="link-success"
        >
          Plant Hardiness Zone API
        </a>
      </div>
      {loading && <Spinner as="span" animation="border" size="sm" />}
      {zone && (
        <div className="mt-3">
          <p className="ms-3">
            The hardiness zone for zip {zipInput} is <b>{zone}</b>
          </p>
        </div>
      )}
      {error && (
        <Alert variant="danger" className="mt-3">
          Error: {error}
        </Alert>
      )}
    </div>
  );
};

export default FindZoneByZip;

/*
Alternative plant hardiness zone API widget at https://www.plantmaps.com/hardiness-zone-zipcode-search-widget.php

<iframe src="https://www.plantmaps.com/hardiness-zone-zipcode.php" name="Find the USDA Hardiness Zone for your Zipocde and Map it" width="210" scrolling="No" frameborder="0" marginheight="0" marginwidth="0">[Your browser doesn't support IFrames. <a href="//www.plantmaps.com/hardiness-zone-zipcode.php" target="_blank">Click here</a> to find the USDA hardiness zone for your zipcode.]</iframe>

*/
