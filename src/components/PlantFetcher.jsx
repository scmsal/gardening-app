import React from "react";
import { useSelector } from "react-redux";
import { Container, Card } from "react-bootstrap";
import placeholderImg from "../assets/icons8-plant-80.png";

function PlantFetcher() {
  const selectedPlant = useSelector((state) => state.plants.selectedPlant);

  console.log("Selected Plant: ", selectedPlant);

  if (!selectedPlant) {
    return <p>No plant selected</p>;
  }

  const { common_name, scientific_name, image } = selectedPlant;

  console.log("image: ", image);

  return (
    <Container className="mx-3 mb-3">
      <Card>
        <Card.Img
          variant="top"
          src={image || placeholderImg}
          alt={image ? { common_name } : "Fallback plant image"}
        />

        {!image && (
          <div className="text-center mt-2">
            <small className="d-block">Image not available</small>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://icons8.com/icon/31725/plant"
            >
              Plant
            </a>
            <span>icon by </span>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://icons8.com"
            >
              Icons8
            </a>
          </div>
        )}
        <Card.Body>
          <Card.Title className="text-center">{common_name}</Card.Title>
          <h6 className="text-center">{scientific_name}</h6>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PlantFetcher;
