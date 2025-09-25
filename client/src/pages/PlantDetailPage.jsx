import "../App.css";
import VeggiesList from "../components/VeggiesList";
import MorePlantDetails from "../components/MorePlantDetails";
import PlantFetcher from "../components/PlantFetcher";
import FindZoneByZip from "../components/FindZoneByZip";
import MoreContentToCome from "../components/MoreContentToCome";
import { Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { selectPlantByName } from "../features/plantsSlice";

function PlantDetailPage() {
  const { plantName } = useParams();
  console.log("Params:", plantName);

  //use selector from plantsSlice to get plant object

  const selectedPlant = useSelector((state) =>
    selectPlantByName(state, plantName)
  );
  console.log("selected plant:", selectedPlant);

  //group the props to pass to child components
  const plantProps = { plantName, selectedPlant };

  return (
    <div className="d-grid pt-3">
      <Row className="justify-content-between ">
        <Col id="first-col" className="col-12 col-md-4">
          <VeggiesList {...plantProps} />
          <FindZoneByZip />
        </Col>
        <Col
          id="middle-col"
          className="d-flex flex-column align-items-center col-12 col-md-8 col-lg-4"
        >
          <PlantFetcher {...plantProps} />
        </Col>
        <Col
          id="3rd-col"
          className="d-flex flex-column col-12 col-md-8 justify-content-between col-lg-4"
        >
          {selectedPlant && <MorePlantDetails {...plantProps} />}
          {selectedPlant && <MoreContentToCome {...plantProps} />}
        </Col>
      </Row>
    </div>
  );
}

export default PlantDetailPage;
