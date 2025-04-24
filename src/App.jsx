import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import VeggiesList from "./components/VeggiesList";
import { Row, Col } from "react-bootstrap";
import QueryForm from "./components/QueryForm";
import DisplayGroup from "./components/DisplayGroup";
import PlantFetcher from "./components/PlantFetcher";

function App() {
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
