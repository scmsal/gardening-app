// Backend API URL with option for production (deployed on Render) or local development

const BACKEND_URL_ENDPOINT =
  import.meta.env.VITE_BACKEND_URL || "https://localhost:5050/api";

export { BACKEND_URL_ENDPOINT };
