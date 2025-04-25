import React from "react";
import { useSelector } from "react-redux";
import { Card } from "react-bootstrap";

function PlantFetcher() {
  const selectedPlant = useSelector((state) => state.plants.selectedPlant);

  // console.log("Selected Plant: ", selectedPlant, selectedPlant.image);

  if (!selectedPlant) {
    return <p>No plant selected</p>;
  }

  const { common_name, scientific_name, image } = selectedPlant;

  console.log(image);
  return (
    <Container className="mx-3 mb-3">
      <Card>
        {image && <Card.Img variant="top" src={image} />}
        <Card.Body>
          <Card.Title className="text-center">{common_name}</Card.Title>
          <h6 className="text-center">{scientific_name}</h6>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PlantFetcher;
