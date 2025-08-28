import { Container, Image } from "react-bootstrap";

const MoreContentToCome = () => {
  return (
    <Container>
      <h4 className="text-success text-center">More Content To Come!</h4>
      <div className="mx-1">
        <Image rounded src={"/gloved_hands_planting.jpg" || ""} fluid />{" "}
      </div>
    </Container>
  );
};

export default MoreContentToCome;
