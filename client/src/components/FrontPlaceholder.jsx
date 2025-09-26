import React from "react";
import { Image } from "react-bootstrap";
import gardenImg from "../assets/garden-7028181_1280.jpg";

function FrontPlaceholder() {
  return (
    <div className="mb-3 w-fit w-md-fit">
      <Image
        src={gardenImg}
        alt="vegetable garden with a wheelbarrow"
        className="img-fluid"
      />
      <p className="text-center small">
        Image by{" "}
        <a
          href="https://pixabay.com/users/alison506-4668088/?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7028181"
          className="link-success"
        >
          Alison Innes
        </a>{" "}
        from{" "}
        <a
          href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=image&utm_content=7028181"
          className="link-success"
        >
          Pixabay
        </a>
      </p>
    </div>
  );
}

export default FrontPlaceholder;
