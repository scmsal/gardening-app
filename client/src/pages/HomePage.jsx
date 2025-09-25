import "../App.css";
import VeggiesList from "../components/VeggiesList";

import { Container, Row, Col } from "react-bootstrap";

import FindZoneByZip from "../components/FindZoneByZip";
import FrontPlaceholder from "../components/FrontPlaceholder";

function HomePage() {
  return (
    <div className="d-grid">
      <Row className="justify-content-between ">
        <Col className="col-12 col-md-4">
          <VeggiesList />
          <FindZoneByZip />
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-center col-12 col-md-8">
          <FrontPlaceholder />
        </Col>
      </Row>
    </div>
  );
}

export default HomePage;
