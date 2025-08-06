import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VeggiesList from "./components/VeggiesList";
import DisplayGroup from "./components/DisplayGroup";
import PlantFetcher from "./components/PlantFetcher";
import LinksToResources from "./components/LinksToResources";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  // addBasicPlantDetails,
  enrichAllPlantDetails,
  loadStarterPlants,
} from "./features/plantsSlice";
import { useDispatch } from "react-redux";
import FindZoneByZip from "./components/FindZoneByZip";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const loadAndEnrich = async () => {
      try {
        await dispatch(loadStarterPlants()).unwrap();
        console.log("Starterplants loaded.");

        //   await dispatch(enrichAllPlantDetails()).unwrap();
      } catch (error) {
        console.log("Error during loading:", error); //change to "loading or enriching" when previous line enabled
      }
    };

    loadAndEnrich();
  }, []);
  //to clear cache for testing
  //localStorage.removeItem("enrichedPlantData");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 pt-3">
        <Row>
          <Col className="col-4">
            <h2 className="text-success ms-3">Some ideas...</h2>
            <VeggiesList />
          </Col>
          <Col className="col-4">
            <PlantFetcher />
          </Col>
          <Col className="col-4">
            <FindZoneByZip />

            {/* <DisplayGroup /> */}
            <LinksToResources />
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  );
}

export default App;
