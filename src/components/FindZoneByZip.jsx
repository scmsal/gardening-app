import { useDispatch, useSelector } from "react-redux";
import { fetchHardinessZone } from "../features/zoneSlice";
import SearchBar from "./SearchBar";
import { useState } from "react";
import { Spinner } from "react-bootstrap";

const FindZoneByZip = () => {
  const dispatch = useDispatch();
  const { zone, loading, error } = useSelector((state) => state.hardinessZone);
  const [zipInput, setZipInput] = useState("");

  /* double check I don't need to rework like this:
 const zone = useSelector((state) => state.hardinessZone.zone); // however you store it
  const loading = useSelector((state) => state.hardinessZone.loading)
  */

  const handleSearch = (zipCode) => {
    setZipInput(zipCode);
    dispatch(fetchHardinessZone(zipCode));
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearch}
        placeholder="Enter zip code"
        label="Find my zone:"
      />

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
