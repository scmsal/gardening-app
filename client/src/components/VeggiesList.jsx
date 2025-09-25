import { useState } from "react";
import { ListGroup, ListGroupItem, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import "../App.css";

import { useNavigate } from "react-router-dom";
import { useSelectedPlant } from "../utils/useSelectedPlant";
import SearchBar from "./SearchBar";

const VeggiesList = () => {
  const navigate = useNavigate();

  const selectedPlant = useSelectedPlant();

  const { allPlantData, loading } = useSelector((state) => state.plants);

  const [searchTerm, setSearchTerm] = useState("");

  const filtered = (allPlantData || []).filter((plant) =>
    plant.common_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const goToPlantDetails = (plantName) => {
    navigate(`/plants/${plantName}`);
  };

  const goToHome = () => {
    navigate("/");
  };

  const handleSearch = (searchTerm) => {
    console.log("Search term:", searchTerm);
    setSearchTerm(searchTerm);
    // dispatch(setSelectedPlantName(null));
    // dispatch(setSelectedPlantData(null));
    // dispatch(setSelectedPlantName(searchTerm));

    // dispatch(getFoodPlantByCommonName(searchTerm));
  };

  const clearFilter = () => {
    setSearchTerm("");
    goToHome();
  };

  //When a plantName on the list is clicked, the app should fetch the corresponding data (object)
  const handlePlantSelect = (plantName) => {
    //deselect
    if (plantName === selectedPlant.common_name) {
      goToHome();
      return;
    }

    //otherwise set selected plant name in state
    // dispatch(setSelectedPlantName(plantName));

    //If there is not already a selectedPlantData in the store or it's not for the selected plant, fetch the data. The extra reducer will set it as selectedPlantData
    // if (!params.plantName || params.plantName !== plantName) {
    //   dispatch(getFoodPlantByCommonName(plantName));
    // }
    goToPlantDetails(plantName);
  };

  if (loading || !allPlantData) {
    return (
      <div className="flex flex-col">
        <Spinner />
        <p>Loading plant list... It might take a minute. </p>
      </div>
    );
  }
  //sets list to full (no selected plant) or filtered to show search result
  const listToRender = searchTerm === "" || null ? allPlantData : filtered;
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
          {listToRender?.map((plant) => (
            <ListGroupItem
              key={plant.common_name}
              action
              className="custom-hover"
              variant={
                selectedPlant?.common_name === plant.common_name
                  ? "success"
                  : "outline-success"
              }
              onClick={() => {
                handlePlantSelect(plant.common_name);
              }}
            >
              {plant.common_name || "unnamed plant"}
            </ListGroupItem>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default VeggiesList;
