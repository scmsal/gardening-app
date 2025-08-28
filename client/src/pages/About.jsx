import { Container } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container className="w-75">
      <h2 className="text-success text-center mt-5 mb-3">About this website</h2>
      <p className="fs-5 mb-3">
        This project was inspired by two questions I had in the spring of 2025.
        One was,
      </p>
      <p className="text-success fst-italic fs-5 mb-3 text-center">
        "What web application can I build now to strengthen and display my
        software development skills?"
      </p>
      <p className="fs-5 mb-3">
        I was also asking myself,
        <span className="text-success fst-italic fs-5 ">
          {" "}
          "What can I plant now?"
        </span>{" "}
      </p>
      <p className="fs-5 ">
        My vegetable garden and my GitHub repository were waiting.{" "}
      </p>
      <p className="fs-5">
        After researching and experimenting with available plant database APIs,
        I decided to create my own with the help of Google Gemini. As with all
        AI-generated material, please note that there may be errors. I manually
        populated the plant image links and sources. The image in the header and
        favicon was produced by CanvaAI.
      </p>
      <p className="fs-5">
        This is still a work in progress as I plan to add other features and
        keep improving the design.
      </p>
    </Container>
  );
};

export default AboutPage;
