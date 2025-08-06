import { Container, Row, Col } from "react-bootstrap";
// import APICallCounter from "./APIcallCounter";

const Footer = () => {
  return (
    <footer className="bg-success bg-opacity-10 py-3 w-100 footer-bottom">
      <Container fluid className="ms-3">
        <Row>
          <Col>Copyright &copy; 2025</Col>
          {/* <Col>
            <APICallCounter />
          </Col> */}
          <Col className="text-center">
            Plant Data: {"  "}
            <a
              href="https://perenual.com"
              target="_blank"
              rel="noopener noreferrer"
              // className="ps-5"
            >
              Perenual.com
            </a>
          </Col>
          <Col className="text-end">
            Plant hardiness zones: {""}
            <a
              href="https://rapidapi.com/fireside-worldwide-fireside-worldwide-default/api/plant-hardiness-zone"
              target="_blank"
              rel="noopener noreferrer"
            >
              RapidAPI
            </a>
          </Col>
          <Col className="text-center">
            GIF via{"  "}
            <a href="https://giphy.com/gifs/tomato-tomates-potager-EGzDfFUauCo6nDgfpk">
              GIPHY
            </a>
          </Col>
          <Col className="text-center">
            Favicon by{" "}
            <a href="https://www.freepik.com/free-vector/tomato-vegetable-organic-icon-isolated_169501930.htm#fromView=keyword&page=1&position=1&uuid=32966af5-595b-423f-b9b9-d08ce1490077&query=Tomato+Svg">
              Freepik
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
