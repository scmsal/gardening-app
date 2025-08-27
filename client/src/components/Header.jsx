import { Container, Nav, Navbar, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Navbar
      collapseOnSelect
      expand="md"
      variant="dark"
      className="bg-success px-4 justify-content-between"
    >
      <div className="d-flex flex-row align-items-center">
        <div style={{ width: "3rem", height: "auto" }}>
          {/* <iframe
            src={"https://giphy.com/embed/EGzDfFUauCo6nDgfpk"}
            width="100"
            height="70"
            className="giphy-embed ms-1"
            allowFullScreen
          ></iframe> */}
          <Image src={"/vegetables.jpg" || ""} fluid />
        </div>

        <Navbar.Brand className="text-white fs-2 ms-3 mb-0">
          What Can I Grow Now?
        </Navbar.Brand>
      </div>
      <Navbar.Toggle aria-controls="responsive-navbar-nav"></Navbar.Toggle>
      <Navbar.Collapse id="responsive-navbar-nav" className="ms-auto">
        <Nav className="ms-auto align-items-center">
          <Nav.Link as={NavLink} to="/" className="custom-nav-link">
            Home
          </Nav.Link>

          <Nav.Link as={NavLink} to="/about" className="custom-nav-link">
            About
          </Nav.Link>

          <Nav.Link as={NavLink} to="/resources" className="custom-nav-link">
            Resources
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Header;
