import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { fetchPlants } from "../features/plantsSlice";
import { Card } from "react-bootstrap";

function PlantFetcher() {
  const dispatch = useDispatch();
  // const plantNames = useSelector((state) => state.plants.plantNames);

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

  return (
    <Card>
      {image && <Card.Img variant="top" src={image} />}
      <Card.Body>
        <Card.Title>{common_name}</Card.Title>
        <h3>{scientific_name}</h3>
      </Card.Body>
    </Card>
  );
}

export default PlantFetcher;
