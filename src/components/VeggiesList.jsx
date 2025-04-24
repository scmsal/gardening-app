import { Container, ListGroup, ListGroupItem } from "react-bootstrap";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedPlant } from "../features/plantsSlice";
import { API_KEY } from "../constants";
// import { plantNamesList } from "../constants";

// const setSelectedPlant = (event.target) =>{

// }

const VeggiesList = () => {
  const dispatch = useDispatch();
  const plantNames = useSelector((state) => state.plants.plantNames);
  const selectedPlant = useSelector((state) => state.plants.selectedPlant);

  console.log(plantNames);
  return (
    <Container className="mx-3">
      <ListGroup>
        {plantNames.map((plant, index) => (
          <ListGroupItem
            key={plant}
            action
            className="custom-hover"
            variant={selectedPlant === plant ? "success" : "outline-success"}
            onClick={() => {
              if (selectedPlant === plant) {
                dispatch(setSelectedPlant(null));
              } else {
                dispatch(setSelectedPlant(plant));
              }
            }}
          >
            {plant}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default VeggiesList;
