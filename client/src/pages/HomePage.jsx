import "../App.css";
import VeggiesList from "../components/VeggiesList";

// import LinksToResources from "./components/LinksToResources";
import { Row, Col } from "react-bootstrap";

import FindZoneByZip from "../components/FindZoneByZip";
import FrontPlaceholder from "../components/FrontPlaceholder";

function HomePage() {
  //to clear cache for testing
  //localStorage.removeItem("enrichedPlantData");

  return (
    <>
      <Row className="justify-content-between ">
        <Col className="col-12 col-md-4">
          <VeggiesList />

          <FindZoneByZip />
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-center col-12 col-md-8">
          <FrontPlaceholder />
        </Col>
      </Row>
    </>
  );
}

export default HomePage;
