import React from "react";
import { useSelector } from "react-redux";
import { Container, Card, Button, Image } from "react-bootstrap";
import placeholderImg from "../assets/icons8-potted-plant-96.png";
import gardenImg from "../assets/garden-7028181_1280.jpg";

function PlantFetcher() {
  const selectedPlant = useSelector((state) => state.plants.selectedPlant);

  console.log("Selected Plant: ", selectedPlant);

  if (!selectedPlant) {
    return (
      <Container className="mx-3 mb-3 auto">
        <p className="text-center">
          Select a plant from the list to see more details
        </p>
        <Image
          src={gardenImg}
          alt="vegetable garden with a wheelbarrow"
          className="img-fluid mx-auto d-block w-75"
        />
        <p className="text-center">
          Image by{" "}
          <a href="https://pixabay.com/users/alison506-4668088/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7028181">
            Alison Innes
          </a>{" "}
          from{" "}
          <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7028181">
            Pixabay
          </a>
        </p>
      </Container>
    );
  }

  const { common_name, scientific_name, image, guideURL } = selectedPlant;

  console.log("image: ", image);

  return (
    <Container className="mx-3 mb-3">
      <Card>
        <Card.Img
          variant="top"
          src={image || placeholderImg}
          alt={image ? { common_name } : "Fallback plant image"}
          className="img-fluid mx-auto d-block w-100 h-50"
          style={{ maxHeight: "300px", objectFit: "cover" }}
        />

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
        <Card.Body>
          <Card.Title className="text-center">{common_name}</Card.Title>
          <h6 className="text-center">{scientific_name}</h6>
          <div className="d-flex justify-content-center">
            <a href={guideURL} target="_blank" rel="noopener noreferrer">
              <Button src={guideURL} variant="outline-success" className="">
                Go to Plant Guide
              </Button>
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default PlantFetcher;
