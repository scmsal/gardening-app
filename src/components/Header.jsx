import { Container, Nav, Navbar } from "react-bootstrap";
import React, { useEffect } from "react";

const Header = () => {
  return (
    <header>
      <Navbar
        bg="success"
        variant="light"
        expand="lg"
        collapseOnSelect
        sticky="top"
      >
        <Container className="ms-0">
          <div className="d-flex align-items-center">
            <iframe
              src="https://giphy.com/embed/EGzDfFUauCo6nDgfpk"
              width="100"
              height="100"
              className="giphy-embed ms-1"
              allowFullScreen
            ></iframe>
            <h1 className="text-white ms-3 mb-0 display-3">
              What Can I Grow Now?
            </h1>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
