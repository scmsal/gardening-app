import "../App.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import VeggiesList from "../components/VeggiesList";
import PlantFetcher from "../components/PlantFetcher";
// import LinksToResources from "./components/LinksToResources";
import { Row, Col } from "react-bootstrap";

import FindZoneByZip from "../components/FindZoneByZip";
import PlantCompat from "../components/PlantCompat";

function PlantDetailPage() {
  return (
    <>
      <h4 className="text-success">Vegetables and Herbs</h4>
      <Row className="justify-content-between ">
        <Col className="col-12 col-md-4">
          <VeggiesList />
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-center col-12 col-md-8 col-lg-4">
          <PlantFetcher />
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-center col-12 col-md-8 col-lg-4">
          <PlantCompat />
        </Col>
      </Row>
    </>
  );
}

export default PlantDetailPage;
