import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setZipCode, fetchHardinessZone } from "../features/zoneSlice";
import { Button, Form, Spinner, Alert, InputGroup } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { FaSearch } from "react-icons/fa";
import InputGroupText from "react-bootstrap/esm/InputGroupText";
//later optimize with useReducer
const FindZoneByZip = () => {
  const dispatch = useDispatch();
  const [zipCodeInput, setZipCodeInput] = useState("");

  const handleSearch = (zipCodeInput) => {
    e.preventDefault();
    if (zipCodeInput.trim() !== "") {
      dispatch(fetchHardinessZone(zipCodeInput));
    }
  };
  const { zone, loading, error } = useSelector((state) => state.hardinessZone);

  return (
    <div>
      <Form onSubmit={handleSearch}>
        <Form.Group controlId="zipCodeInput">
          <Form.Label>Find plant hardiness zone</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              value={zipCodeInput}
              onChange={(e) => setZipCodeInput(e.target.value)}
              placeholder="zip code"
              className="w-25"
            />

            <Button type="submit" variant="outline-success" disabled={loading}>
              {loading ? (
                <Spinner as="span" animation="border" size="sm" />
              ) : (
                "Submit"
              )}
            </Button>
          </InputGroup>
        </Form.Group>
      </Form>

      {zone && !loading && (
        <div className="mt-3">
          <h5>Hardiness Zone: {zone}</h5>
        </div>
      )}

      {error && !loading && (
        <Alert variant="danger" className="mt-3">
          Error: {error}
        </Alert>
      )}
    </div>
  );
};

export default FindZoneByZip;
