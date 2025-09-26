import { Card } from "react-bootstrap";
import { useSelectedPlant } from "../utils/useSelectedPlant";

const MorePlantDetails = () => {
  const selectedPlant = useSelectedPlant();

  return (
    <Card className="mx-3 mb-3 p-4">
      <h5 className="text-success text-center">Planting instructions </h5>
      <div className="ms-1 mb-3">
        <p className="ms-2 mb-0">
          <span>
            <b className="me-1 ">Method: </b>
          </span>
          <span>{selectedPlant.method}</span>
        </p>
        <p className="ms-2 mb-0">
          <span>
            <b className="mb-0 me-1 ">Spacing: </b>
          </span>
          <span>{selectedPlant.spacing}</span>
        </p>
        <p className="ms-2 mb-0">
          <span>
            <b className="mb-0 me-1 ">Planting depth: </b>
          </span>
          <span>{selectedPlant.planting_depth}</span>
        </p>
        <p className="ms-2 mb-0">
          <span>
            <b className="mb-2  me-1 ">Soil type: </b>
          </span>
          <span>{selectedPlant.soil_type}</span>
        </p>
      </div>

      <h5 className="text-success text-center">Companion Planting</h5>
      <div className="d-flex flex-wrap ms-2 mb-3">
        <span>
          <b className="mb-1 me-1">Companion plants: </b>
        </span>
        {selectedPlant.companion_plants.map((plantName) => {
          return (
            <span
              key={plantName}
              className="border border-success rounded me-2 mb-1 px-1 text-nowrap"
            >
              {plantName}
            </span>
          );
        })}
      </div>
      <div className="d-flex flex-wrap ms-2">
        <span>
          <b className="mb-1 me-1">Incompatible plants: </b>
        </span>

        {selectedPlant.incompatible_plants.map((plantName) => {
          return (
            <span
              key={plantName}
              className="border border-danger rounded me-2 mb-1 px-1 text-nowrap"
            >
              {plantName}
            </span>
          );
        })}
      </div>
    </Card>
  );
};

export default MorePlantDetails;
