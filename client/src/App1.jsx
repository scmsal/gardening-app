import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Header = lazy(() => import("./components/Header"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ResourcesPage = lazy(() => import("./pages/Resources"));
const AboutPage = lazy(() => import("./pages/About"));
const PlantDetailPage = lazy(() => import("./pages/PlantDetailPage"));
// const OrnamentalPlantsPage = lazy(() => import("./pages/ornamental"));
const Footer = lazy(() => import("./components/Footer"));

//Main app, my own implementation
function App() {
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
            {/* <Route
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
