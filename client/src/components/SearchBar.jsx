import React, { useState } from "react";
import { Form, Button, InputGroup, Spinner } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({
  onSearch,
  loading,
  placeholder = "Enter search term",
  label,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      onSearch(inputValue);
      setInputValue(""); //clears search bar after search
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="mx-3">
      <InputGroup className="mb-3 d-flex align-items-center">
        <Form.Label className="me-1">{label} </Form.Label>
        <Form.Control
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder={placeholder}
          className="w-25"
          disabled={loading} //check this here and inside Button
        />

        <Button type="submit" variant="outline-success" disabled={loading}>
          {loading ? (
            <Spinner as="span" animation="border" size="sm" />
          ) : (
            <FaSearch />
          )}
        </Button>
      </InputGroup>
    </Form>
  );
};

export default SearchBar;
