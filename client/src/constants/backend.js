// Backend API URL with option for production (deployed on Render) or local development

let BACKEND_URL_ENDPOINT;

//in development, use the deployed backend url but fall back to localhost. I had two other code blocks before but got a recommendaton from ChatGPT to choose one and add a check.
if (import.meta.env.VITE_ENV === "development") {
  BACKEND_URL_ENDPOINT =
    "http://localhost:5050" || import.meta.env.VITE_BACKEND_URL;
} else {
  // in production, require backend URL to be set in environment variables
  if (!import.meta.env.VITE_BACKEND_URL) {
    throw new Error("VITE_BACKEND_URL must be set for production.");
  }
  BACKEND_URL_ENDPOINT = import.meta.env.VITE_BACKEND_URL;
}

export { BACKEND_URL_ENDPOINT };
