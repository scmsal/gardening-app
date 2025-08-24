import { Container, Row, Col } from "react-bootstrap";
// import APICallCounter from "./APIcallCounter";

const Footer = () => {
  return (
    <footer className="bg-success bg-opacity-10 py-3 w-100 mt-auto">
      <Container fluid className="ms-3">
        <Row>
          <Col>Copyright &copy; 2025</Col>
          {/* <Col>
            <APICallCounter />
          </Col> */}
          {/* <Col className="text-center">
            Plant Data: {"  "}
            <a
              href="https://perenual.com"
              target="_blank"
              rel="noopener noreferrer"
              // className="ps-5"
            >
              Perenual.com
            </a>
          </Col> */}

          {/* <Col className="text-center">
            GIF via{"  "}
            <a href="https://giphy.com/gifs/tomato-tomates-potager-EGzDfFUauCo6nDgfpk">
              GIPHY
            </a>
          </Col> */}
          <Col className="text-center"></Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
