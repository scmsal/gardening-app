// Backend API URL

const BACKEND_URL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? REACT_APP_BACKEND_URL
    : "http://localhost:5050/api";
export { BACKEND_URL_ENDPOINT };
