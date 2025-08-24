import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

const MorePlantDetails = () => {
  const selectedPlant = useSelector((state) => state.plants.selectedPlantData);
  if (selectedPlant) {
    return (
      <Card className="mx-3 mb-3 w-60% p-4">
        <h6 className="text-success text-center">Planting instructions </h6>
        <div className="ms-1 mb-3">
          <p className="mb-0">
            <span>
              <b className="ms-2 me-1 ">Method: </b>
            </span>
            <span>{selectedPlant.method}</span>
          </p>
          <p className="mb-0">
            <span>
              <b className="mb-0 ms-2  me-1 ">Spacing: </b>
            </span>
            <span>{selectedPlant.spacing}</span>
          </p>
          <p className="mb-0">
            <span>
              <b className="mb-0 ms-2 me-1 ">Planting depth: </b>
            </span>
            <span>{selectedPlant.planting_depth}</span>
          </p>
          <p className="mb-0">
            <span>
              <b className="mb-2 ms-2 me-1 ">Soil type: </b>
            </span>
            <span>{selectedPlant.soil_type}</span>
          </p>
        </div>

        <h6 className="text-success text-center">Companion Planting</h6>
        <div className="d-flex flex-wrap ms-2 mb-3">
          <span>
            <b className="mb-1 me-1">Companion plants: </b>
          </span>
          {selectedPlant.companion_plants.map((plantName) => {
            return (
              <span
                key={plantName}
                className="border border-success me-2 mb-1 px-1 text-nowrap"
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
                className="border border-danger me-2 mb-1 px-1 text-nowrap"
              >
                {plantName}
              </span>
            );
          })}
        </div>
      </Card>
    );
  }
};

export default MorePlantDetails;
