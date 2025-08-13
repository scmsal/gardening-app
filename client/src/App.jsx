import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VeggiesList from "./components/VeggiesList";
import PlantFetcher from "./components/PlantFetcher";
import LinksToResources from "./components/LinksToResources";
import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import FindZoneByZip from "./components/FindZoneByZip";

function App() {
  //to clear cache for testing
  //localStorage.removeItem("enrichedPlantData");

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <main className="flex-grow-1 pt-3">
        <Row className="px-4">
          <Col className="col-sm-12 col-md-6 col-lg-4">
            <h2 className="text-success ms-3">Some ideas...</h2>
            <VeggiesList />
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4">
            <PlantFetcher />
          </Col>
          <Col className="col-sm-12 col-md-6 col-lg-4">
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
