import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VeggiesList from "./components/VeggiesList";
import QueryForm from "./components/QueryForm";
import DisplayGroup from "./components/DisplayGroup";
import PlantFetcher from "./components/PlantFetcher";
import { Row, Col } from "react-bootstrap";
import { useEffect } from "react";
import { loadStarterPlants } from "./features/plantsSlice";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const testFetch = async () => {
      try {
        const response = await fetch("/test.txt");
        const text = await response.text();
        console.log("test file content:", text);
      } catch (error) {
        console.error("Error fetching test file:", error);
      }
    };
    testFetch();
    dispatch(loadStarterPlants());
  }, [dispatch]);

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
