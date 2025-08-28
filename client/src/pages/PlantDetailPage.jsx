import "../App.css";
import VeggiesList from "../components/VeggiesList";
import MorePlantDetails from "../components/MorePlantDetails";
import PlantFetcher from "../components/PlantFetcher";
import FindZoneByZip from "../components/FindZoneByZip";
import MoreContentToCome from "../components/MoreContentToCome";
import { Row, Col } from "react-bootstrap";

function PlantDetailPage() {
  return (
    <div className="d-grid pt-3">
      <Row className="justify-content-between ">
        <Col className="col-12 col-md-4">
          <VeggiesList />
          <FindZoneByZip />
        </Col>
        <Col className="d-flex flex-column align-items-center col-12 col-md-8 col-lg-4">
          <PlantFetcher />
        </Col>
        <Col className="d-flex flex-column col-12 col-md-8 justify-content-between col-lg-4">
          <MorePlantDetails />
          <MoreContentToCome />
        </Col>
      </Row>
    </div>
  );
}

export default PlantDetailPage;
