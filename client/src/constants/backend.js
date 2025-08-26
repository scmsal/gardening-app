const NODE_ENV = "production";

const BACKEND_URL_ENDPOINT =
  NODE_ENV === "production"
    ? "https://gardening-app-hurn.onrender.com/"
    : "http://localhost:5050/api";

export { BACKEND_URL_ENDPOINT };
