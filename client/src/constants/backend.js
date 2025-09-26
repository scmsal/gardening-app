let BACKEND_URL_ENDPOINT;

// in development, use the deployed backend url but fall back to localhost.
if (import.meta.env.VITE_ENV === "development") {
  BACKEND_URL_ENDPOINT =
    import.meta.env.VITE_REMOTE_API === "true"
      ? import.meta.env.VITE_BACKEND_URL
      : "http://localhost:5050";
} else {
  if (!import.meta.env.VITE_BACKEND_URL) {
    throw new Error("VITE_BACKEND_URL must be set for production.");
  }
  BACKEND_URL_ENDPOINT = import.meta.env.VITE_BACKEND_URL;
}

export { BACKEND_URL_ENDPOINT };
