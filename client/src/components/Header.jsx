import { Container, Nav, Navbar, Image } from "react-bootstrap";
import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons/faX";

const Header = () => {
  return (
    <header>
      <Navbar
        variant="light"
        expand="lg"
        collapseOnSelect
        sticky="top"
        className="d-flex bg-success justify-content-between px-4"
      >
        <div className="d-flex align-items-center">
          <div className="w-10">
            {/* <iframe
            src={"https://giphy.com/embed/EGzDfFUauCo6nDgfpk"}
            width="100"
            height="70"
            className="giphy-embed ms-1"
            allowFullScreen
          ></iframe> */}
            <Image
              src={"/vegetables.jpg" || ""}
              style={{ width: "5rem", height: "auto" }}
            />
          </div>

          <h1 className="text-white ms-3 mb-0">What Can I Grow Now?</h1>
        </div>
        <div className="d-flex gap-4 align-items-center">
          <NavLink to="/" className="custom-nav-link">
            Home
          </NavLink>
          <NavLink to="/about" className="custom-nav-link">
            About
          </NavLink>
          <NavLink to="/resources" className="custom-nav-link">
            Resources
          </NavLink>
        </div>
      </Navbar>
    </header>
  );
};

export default Header;
