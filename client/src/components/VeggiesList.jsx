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
import { useNavigate } from "react-router-dom";

const VeggiesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAndSetNames = async () => {
      try {
        await dispatch(listAllNames());
      } catch (err) {
        console.error("Failed to fetch plant names:", err);
      }
    };
    fetchAndSetNames();
  }, [dispatch]);

  const { plantNames, loading, selectedPlantName, selectedPlantData } =
    useSelector((state) => state.plants);

  //I got conceptual guidance from ChatGPT for the search and search mode logic, to display the full list of plants
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
    goToHome();
  };
  //Navigate to selected plant details page
  const goToPlantDetails = (plantName) => {
    navigate(`/plants/${plantName}`);
  };

  const goToHome = () => {
    navigate("/");
  };
  //When a plantName on the list is clicked, the app should fetch the corresponding data (object)
  const handlePlantSelect = (plantName) => {
    //deselect
    if (plantName === selectedPlantName) {
      goToHome();
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
    goToPlantDetails(plantName);
  };

  if (loading || !plantNames) {
    return (
      <div className="flex flex-col">
        <Spinner />
        <p>Loading plant list... It might take a minute. </p>
      </div>
    );
  }
  //sets list to full (no selected plant) or filtered to show search result
  const listToRender = searchTerm === "" || null ? plantNames : filtered;
  return (
    <div className=" mx-3 mb-3 ">
      <h4 className="text-success">Vegetables and Herbs</h4>
      <div className="flex flex-row gap-1">
        <SearchBar
          placeholder="Find a plant"
          onSearch={handleSearch}
          clearBtn
          clearBtnClick={clearFilter}
        />
      </div>
      {/* <p className="">Select a plant from the list to see more details</p> */}
      {listToRender.length === 0 || listToRender === null ? (
        <p>No plants found</p>
      ) : (
        <ListGroup className="h-fit h-md-fit overflow-auto grid grid-cols-2">
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
      )}
    </div>
  );
};

export default VeggiesList;
