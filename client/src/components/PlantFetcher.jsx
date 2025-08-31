import React from "react";
import { useSelector } from "react-redux";
import { Card, Image, Table } from "react-bootstrap";
import { useState } from "react";
import placeholderImg from "../assets/icons8-potted-plant-96.png";
import gardenImg from "../assets/garden-7028181_1280.jpg";

function PlantFetcher() {
  const selectedPlant = useSelector((state) => state.plants.selectedPlantData);
  const [imageLoaded, setImageLoaded] = useState(false);

  if (!selectedPlant) {
    return (
      <div className="mb-3 w-50">
        <Image
          src={gardenImg}
          alt="vegetable garden with a wheelbarrow"
          className="img-fluid"
        />
        <p className="text-center fs-6">
          Image by{" "}
          <a href="https://pixabay.com/users/alison506-4668088/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7028181">
            Alison Innes
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7028181">
            Pixabay
          </a>
        </p>
      </div>
    );
  }

  const {
    common_name,
    scientific_name,
    image_info: { image_url: image },
    guideURL,
  } = selectedPlant;

  return (
    <div className="mx-3 mb-3 w-60%">
      <Card>
        <div>
          <Card.Img
            variant="top"
            src={image}
            alt={{ common_name } || "Fallback plant image"}
            className="img-fluid w-100 object-fit-cover"
            onLoad={() => {
              setImageLoaded(true);
            }}
            onError={(e) => {
              e.target.src = placeholderImg;
            }}
            style={{ height: "250px" }}
          />
          <Card.Title className="text-center text-success fs-3">
            {common_name}
          </Card.Title>
          <h6 className="text-center fst-italic px-2">{scientific_name}</h6>
        </div>
        {!imageLoaded && <p>Loading image...</p>}
        {!image && (
          <div className="text-center mt-2">
            <small className="d-block">Image not available</small>

            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://icons8.com/icon/106124/potted-plant"
            >
              Potted Plant
            </a>
            <span> icon by </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://icons8.com"
            >
              Icons8
            </a>
          </div>
        )}
        {imageLoaded && (
          <Card.Body>
            <div className="d-flex justify-content-center">
              <a href={guideURL} target="_blank" rel="noopener noreferrer">
                {/* <Button src={guideURL} variant="outline-success" className="">
                Go to Plant Guide
              </Button> */}
              </a>
            </div>
            <Table className="mb-1" size="sm">
              <tbody>
                <tr>
                  <td>
                    <b>{`Growth rate: `} </b> {selectedPlant.growth_rate}
                  </td>
                  <td>
                    <b>{`Care level: `} </b> {selectedPlant.care_level}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>{`Hardiness zone: `}</b>
                    {`${selectedPlant.hardiness_zone.min} - ${selectedPlant.hardiness_zone.max}`}
                  </td>
                  <td>
                    <b>{`Cycle: `} </b> {selectedPlant.cycle}{" "}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>{`Plant in: `}</b>
                    {selectedPlant.planting_season}
                  </td>
                  <td>
                    <b>{`Sunlight: `}</b>
                    {selectedPlant.sunlight}
                  </td>
                </tr>
                <tr>
                  <td>
                    <b>{`Height: `}</b>
                    {`${selectedPlant.height_inches.min} to ${selectedPlant.height_inches.max} inches`}
                  </td>
                  <td>
                    <b>{`Width: `}</b>
                    {`${selectedPlant.width_inches.min} to ${selectedPlant.width_inches.max} inches`}
                  </td>
                </tr>
              </tbody>
            </Table>
            <label className="small">
              {`Photo by ${selectedPlant.image_info.photographer}, `}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={selectedPlant.image_info.license_url}
                className="link-success"
              >
                {selectedPlant.image_info.license}
              </a>{" "}
              via{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={selectedPlant.image_info.page_url}
                className="link-success"
              >
                {selectedPlant.image_info.platform}
              </a>
            </label>
          </Card.Body>
        )}
      </Card>
    </div>
  );
}

export default PlantFetcher;
