import { Card, Table, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import placeholderImg from "../assets/icons8-plant-80.png";
import { useSelectedPlant } from "../utils/useSelectedPlant";

function PlantFetcher() {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);
  const selectedPlant = useSelectedPlant();

  useEffect(() => {
    const rawUrl =
      selectedPlant?.image_info?.image_url !== ""
        ? selectedPlant?.image_info?.image_url
        : null;
    const url = rawUrl || null;
    // currentSrc resets each time the object changes;

    setCurrentSrc(url);
    // reset imageLoaded each time image src changes so the "loading" message can show when applicable.
    setImageLoaded(false);
  }, [selectedPlant?.image_info?.image_url, selectedPlant]);

  if (!selectedPlant) {
    return <div className="mb-3 w-50">No plant selected.</div>;
  }
  const { common_name, scientific_name } = selectedPlant;
  return (
    <div className="mx-3 mb-3 w-60%">
      <Card>
        {!imageLoaded && (
          <div
            className="d-flex flex-column bg-light align-items-center justify-content-center"
            style={{ height: "250px" }}
          >
            <Spinner variant="success" />
            <p className="mt-4">Loading image</p>
          </div>
        )}

        <div>
          <Card.Img
            key={currentSrc}
            variant="top"
            src={currentSrc}
            alt={currentSrc ? common_name : "Fallback plant image"}
            className={`img-fluid w-100 object-fit-cover ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ height: "250px", transition: "opacity 150ms ease" }}
            onLoad={() => {
              setImageLoaded(true);
            }}
            onError={(e) => {
              e.target.src = placeholderImg;
              setImageLoaded(true);
            }}
          />
        </div>
        <div>
          <Card.Title className="text-center text-success fs-3">
            {common_name}
          </Card.Title>
          <h6 className="text-center fst-italic px-2">{scientific_name}</h6>
          <Card.Body>
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
        </div>
      </Card>
    </div>
  );
}

export default PlantFetcher;
