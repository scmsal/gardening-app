import {
  Container,
  ListGroup,
  ListGroupItem,
  Spinner,
  Button,
} from "react-bootstrap";
import "../App.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  setSelectedPlantName,
  setSelectedPlantData,
} from "../features/plantsSlice";
import {
  getAllFoodPlants,
  listAllNames,
  getFoodPlantByCommonName,
} from "../features/plantsSlice";
import SearchBar from "./SearchBar";
import classNames from "classnames";

const VeggiesList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetNames = async () => {
      try {
        const resultAction = await dispatch(listAllNames());
        console.log("Fetched names:", resultAction);
      } catch (err) {
        console.error("Failed to fetch plant names:", err);
      }
    };
    fetchAndSetNames();
  }, [dispatch]);

  const { plantNames, loading, selectedPlantName, selectedPlantData } =
    useSelector((state) => state.plants);

  console.log("Plant names: ", plantNames);

  useEffect(() => {
    console.log("Updated selectedPlantName:", selectedPlantName);
  }, [selectedPlantName]);

  useEffect(() => {
    console.log("Updated selectedPlantData:", selectedPlantData);
  }, [selectedPlantData]);

  //I got help from ChatGPT for the search and search mode logic, to display the full list if
  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (plantNames || []).filter((common_name) =>
    common_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
    setSearchTerm(searchTerm);
    dispatch(setSelectedPlantName(null));
    dispatch(setSelectedPlantData(null));
    dispatch(setSelectedPlantName(searchTerm));

    dispatch(getFoodPlantByCommonName(searchTerm));
  };

  const clearFilter = () => {
    setSearchTerm("");
  };
  //When a plantName on the list is clicked, the app should fetch the corresponding data (object)
  const handlePlantSelect = (plantName) => {
    console.log("Plant that was clicked:", plantName);
    console.log("Selected plant:", selectedPlantName);
    //deselect
    if (plantName === selectedPlantName) {
      dispatch(setSelectedPlantName(null));
      dispatch(setSelectedPlantData(null));
      return;
    }

    //otherwise set selected plant name in state
    dispatch(setSelectedPlantName(plantName));

    //If there is not already a selectedPlantData in the store or it's not for the selected plant, fetch the data. The extra reducer will set it as selectedPlantData
    if (!selectedPlantData || selectedPlantData.common_name !== plantName) {
      dispatch(getFoodPlantByCommonName(plantName));
    }
  };

  if (loading || !plantNames) {
    return (
      <div className="flex flex-col">
        <Spinner />
        <p>Loading plant list... </p>
      </div>
    );
  }

  const listToRender = searchTerm === "" || null ? plantNames : filtered;
  return (
    <Container className="mx-3 mb-3 ">
      <div className="flex flex-row gap-1">
        <SearchBar
          placeholder="Search for a vegetable or herb"
          onSearch={handleSearch}
          clearBtn
          clearBtnClick={clearFilter}
        />
      </div>

      <h2 className="text-success ms-3">Some ideas...</h2>
      <ListGroup className=" h-md-fit overflow-auto grid grid-cols-2">
        {listToRender?.map((plantName) => (
          <ListGroupItem
            key={plantName}
            action
            className="custom-hover"
            variant={
              selectedPlantName === plantName ? "success" : "outline-success"
            }
            onClick={() => {
              handlePlantSelect(plantName);
            }}
          >
            {plantName || "unnamed plant"}
          </ListGroupItem>
        ))}
      </ListGroup>
    </Container>
  );
};

export default VeggiesList;
