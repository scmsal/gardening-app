// Backend API URL
import.meta.env.VITE_BACKEND_URL;

// === hardcoded option ===
// const LOCAL_BACKEND_URL = "http://localhost:5050/api";

// const PRODUCTION_BACKEND_URL = "https://gardening-app-hurn.onrender.com/api";

// const BACKEND_URL_ENDPOINT =
//   window.location.localhost === "localhost"
//     ? LOCAL_BACKEND_URL
//     : PRODUCTION_BACKEND_URL;

//=== with env variables ===
const BACKEND_URL_ENDPOINT = import.meta.env.VITE_BACKEND_URL;

export { BACKEND_URL_ENDPOINT };
