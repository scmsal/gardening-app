import { Container } from "react-bootstrap";

const AboutPage = () => {
  return (
    <Container className="px-5">
      <h2 className="text-success text-center mt-5 mb-3">About this website</h2>
      <p className="fs-5 mb-3">
        This project began in spring 2025 with two simple questions:
      </p>
      <p className="text-success fst-italic fs-5 mb-3">
        "What web application can I build now to strengthen and display my
        software development skills?"{" "}
        <span className="text-body fst-normal">and</span>
      </p>
      <p className="fs-5 mb-3">
        <span className="text-success fst-italic fs-5 ">
          {" "}
          "What can I plant now?"
        </span>{" "}
      </p>
      <p className="fs-5 ">
        Both my vegetable garden and my GitHub repository were waiting.{" "}
      </p>
      <p className="fs-5">
        I built this app after researching plant database APIs and experimenting
        with different approaches. Plant images and sources were curated
        manually. The header and future content placeholder image were created
        using AI tools.
      </p>
      <p className="fs-5">
        This app is still evolving - I plan to add new features and continue
        refining the design.
      </p>
    </Container>
  );
};

export default AboutPage;
