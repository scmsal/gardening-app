import { ListGroup, Card } from "react-bootstrap";
//import/access state with edibleparts. See Card title

const DisplayGroup = () => {
  //get filtered results for matching .
  return (
    <Card className="p-3 rounded mx-3">
      <Card.Body>
        <Card.Title as="div">
          <strong>Selected Parts will go here</strong>
          <ListGroup></ListGroup>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default DisplayGroup;
