import "../App.css";
import VeggiesList from "../components/VeggiesList";
import MorePlantDetails from "../components/MorePlantDetails";
import PlantFetcher from "../components/PlantFetcher";
import { Row, Col } from "react-bootstrap";

function PlantDetailPage() {
  return (
    <>
      <Row className="justify-content-between ">
        <Col className="col-12 col-md-4">
          <VeggiesList />
        </Col>
        <Col className="d-flex flex-column justify-content-center align-items-center col-12 col-md-8 col-lg-4">
          <PlantFetcher />
        </Col>
        <Col className="d-flex flex-column align-items-center col-12 col-md-8 col-lg-4">
          <MorePlantDetails />
        </Col>
      </Row>
    </>
  );
}

export default PlantDetailPage;
