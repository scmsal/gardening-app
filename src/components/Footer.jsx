import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="text-green py-3 w-100 footer-bottom">
      <Container fluid>
        <Row>
          <Col>Copyright &copy; 2025</Col>
          <Col className="text-center">
            Data: {"  "}
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
            GIF credit: {"  "}
            <a href="https://giphy.com/gifs/tomato-tomates-potager-EGzDfFUauCo6nDgfpk">
              via GIPHY
            </a>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
