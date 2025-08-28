import { Container } from "react-bootstrap";
const LinksToResources = () => {
  return (
    <Container className="w-75 fs-5">
      <h2 className="text-success text-center my-3">
        Other Resources on the Web
      </h2>

      <ul>
        <li>
          {" "}
          The Old Farmer's Almanac – {""}
          <a
            href="https://www.almanac.com/vegetable-gardening-for-beginners"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vegetable Gardening for Beginners: The Complete Guide
          </a>
        </li>
        <li>
          The Home Depot – {""}
          <a
            href="https://www.almanac.comhttps://www.homedepot.com/c/ai/herb-gardening-guide-for-beginners/9ba683603be9fa5395fab901a017fe5c/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Herb Gardening Guide for Beginners
          </a>
        </li>
        <li>
          {" "}
          USDA National Agricultural Library – {""}
          <a
            href="https://www.nal.usda.gov/plant-production-gardening/vegetable-gardening"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vegetable Gardening
          </a>
        </li>
      </ul>
    </Container>
  );
};

export default LinksToResources;
