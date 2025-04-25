import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card } from "react-bootstrap";

function PlantFetcher() {
  const dispatch = useDispatch();

  const plantData = useSelector((state) => state.plants.plantData);

  const selectedPlant = useSelector((state) => state.plants.selectedPlant);

  // console.log("Selected Plant: ", selectedPlant, selectedPlant.image);

  if (!selectedPlant) {
    return <p>No plant selected</p>;
  }

  const { common_name, scientific_name, image } = selectedPlant;
  // useEffect(() => {
  //   if (plantNames.length > 0) {
  //     dispatch(fetchPlants(plantNames));
  //   }
  // }, [dispatch, plantNames]);
  console.log(image);
  return (
    <Card>
      {image && <Card.Img variant="top" src={image} />}
      <Card.Body>
        <Card.Title className="text-center">{common_name}</Card.Title>
        <h6 className="text-center">{scientific_name}</h6>
      </Card.Body>
    </Card>
  );
}

export default PlantFetcher;
