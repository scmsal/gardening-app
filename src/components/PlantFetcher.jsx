import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPlants } from "../features/plantsSlice";
import { Card } from "react-bootstrap";

function PlantFetcher() {
  const dispatch = useDispatch();
  // const status = useSelector((state) => state.plants.status);
  const plantNames = useSelector((state) => state.plants.plantNames);
  const plantData = useSelector((state) => state.plants.plantData);

  const selectedPlant = useSelector((state) => state.plants.selectedPlant);

  // useEffect(() => {
  //   if (plantNames.length > 0) {
  //     dispatch(fetchPlants(plantNames));
  //   }
  // }, [dispatch, plantNames]);

  return (
    // <div>
    //   <h1>Plant Data</h1>
    //   <pre>{JSON.stringify(plantData, null, 2)}</pre>
    // </div>
    <Card>
      <Card.Img>{}</Card.Img>
      <Card.Body>
        <Card.Title>{selectedPlant.common_name}</Card.Title>
        <h3>{selectedPlant.scientific_name}</h3>
      </Card.Body>
    </Card>
  );
}

export default PlantFetcher;
