import { useDispatch, useSelector } from "react-redux";
import { fetchHardinessZone } from "../features/zoneSlice";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Spinner, Container } from "react-bootstrap";

const FindZoneByZip = () => {
  const dispatch = useDispatch();
  const { zone, loading, error } = useSelector((state) => state.hardinessZone);
  const [zipInput, setZipInput] = useState("");

  const handleSearch = (zipCode) => {
    setZipInput(zipCode);
    dispatch(fetchHardinessZone(zipCode));
  };

  //

  return (
    <div className="d-flex flex-column  mt-4">
      <h4 className="text-success">Plant Hardiness Zone</h4>

      {/* plant hardiness zone API widget copied from https://www.plantmaps.com/hardiness-zone-zipcode-search-widget.php and edited for sizing*/}
      <iframe
        src="https://www.plantmaps.com/hardiness-zone-zipcode.php"
        name="Find the USDA Hardiness Zone for your Zipocde and Map it"
        width="290"
        scrolling="No"
        frameborder="0"
      >
        [Your browser doesn't support IFrames.{" "}
        <a
          href="//www.plantmaps.com/hardiness-zone-zipcode.php"
          target="_blank"
        >
          Click here
        </a>{" "}
        to find the USDA hardiness zone for your zipcode. .]
      </iframe>
      <label className="small">
        Average annual extreme minimum temperatures for an area.
      </label>
    </div>
  );

  //=== I have commented this out because the API server is unreliable
  // return (
  //   <div className="w-100">
  //     <h4 className="text-success">Plant Hardiness Zone</h4>
  //     <SearchBar
  //       onSearch={handleSearch}
  //       placeholder="Enter zip code"
  //       label="Find my zone:"
  //     />
  //     <div className="text-end small">
  //       <span>Powered by </span>{" "}
  //       <a
  //         href="https://rapidapi.com/fireside-worldwide-fireside-worldwide-default/api/plant-hardiness-zone"
  //         target="_blank"
  //         rel="noopener noreferrer"
  //         className="link-success"
  //       >
  //         Plant Hardiness Zone API
  //       </a>
  //     </div>
  //     {loading && <Spinner as="span" animation="border" size="sm" />}
  //     {zone && (
  //       <div className="mt-3">
  //         <p className="ms-3">
  //           The hardiness zone for zip {zipInput} is <b>{zone}</b>
  //         </p>
  //       </div>
  //     )}
  //     {error && (
  //       <Alert variant="danger" className="mt-3">
  //         Error: {error}
  //       </Alert>
  //     )}
  //   </div>
  // );
};

export default FindZoneByZip;
