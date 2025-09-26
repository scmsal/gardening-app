import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

import { getAllFoodPlants } from "./features/plantsSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

const Header = lazy(() => import("./components/Header"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ResourcesPage = lazy(() => import("./pages/Resources"));
const AboutPage = lazy(() => import("./pages/About"));
const PlantDetailPage = lazy(() => import("./pages/PlantDetailPage"));
// TODO const OrnamentalPlantsPage = lazy(() => import("./pages/ornamental"));
const Footer = lazy(() => import("./components/Footer"));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchAndSetPlantData = async () => {
      try {
        await dispatch(getAllFoodPlants());
      } catch (err) {
        console.error("Failed to fetch plant data:", err);
      }
    };
    fetchAndSetPlantData();
  }, [dispatch]);

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <main className="flex-grow-1 px-5 pt-3">
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path="/about"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <AboutPage />
                </Suspense>
              }
            />
            <Route
              path="/resources"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <ResourcesPage />
                </Suspense>
              }
            />
            <Route
              path="/plants/:plantName"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <PlantDetailPage />
                </Suspense>
              }
            />
            {/* TODO <Route
            path="/ornamental"
            element={
              <Suspense fallback={<div>Loading...</div>}>
                <OrnamentalPlantsPage />
              </Suspense>
            }
          /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
