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
    <div className="d-flex flex-column  mx-3 mt-4">
      <h4 className="text-success">Plant Hardiness Zone</h4>
      <label className="small">
        Average annual extreme minimum temperatures for an area.
      </label>

      <iframe
        src="https://www.plantmaps.com/hardiness-zone-zipcode.php"
        name="Find the USDA Hardiness Zone for your Zipocde and Map it"
        width="290"
        // frameborder is deprecated so I replaced it with this CSS:
        style={{ border: 0 }}
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
    </div>
  );
};

export default FindZoneByZip;
