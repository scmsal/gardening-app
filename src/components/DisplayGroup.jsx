import { ListGroup, Card, Container } from "react-bootstrap";
//import/access state with edibleparts. See Card title

const DisplayGroup = () => {
  //get filtered results for matching edible parts.
  return (
    <Container className="mx-3">
      <Card className="p-3 rounded">
        <Card.Body>
          <Card.Title as="div">
            <strong>Selected Parts will go here</strong>
            <ListGroup></ListGroup>
          </Card.Title>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DisplayGroup;
