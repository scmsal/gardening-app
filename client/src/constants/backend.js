// Backend API URL

const BACKEND_URL_ENDPOINT =
  process.env.NODE_ENV === "production"
    ? `${process.env.REACT_APP_BACKEND_URL}/api`
    : "http://localhost:5050/api";
export { BACKEND_URL_ENDPOINT };
