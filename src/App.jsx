import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VeggiesList from "./components/VeggiesList";
import QueryForm from "./components/QueryForm";
import DisplayGroup from "./components/DisplayGroup";
import PlantFetcher from "./components/PlantFetcher";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import {
  enrichAllPlantDetails,
  loadStarterPlants,
} from "./features/plantsSlice";
import { useDispatch, useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadStarterPlants()).then(() => {
      dispatch(enrichAllPlantDetails()); //I want them all to load at the beginning for data manipulation (grouping, etc). Otherwise, I'd only fetch the enriched data on selecting a plant to display its details.
    });
  }, [dispatch]);

  //to clear cache for testing
  //localStorage.removeItem("enrichedPlantData");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 pt-5">
        <Row>
          <Col className="col-4">
            <VeggiesList />
          </Col>
          <Col className="col-4">
            <QueryForm />
            <DisplayGroup />
            <PlantFetcher />
          </Col>
        </Row>
      </main>
      <Footer />
    </div>
  );
}

export default App;
