import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const TestLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100 m-0 p-0 bg-dark text-white w-100">
      <header className="bg-primary py-3 text-center w-100">
        <h1 className="mb-0">Header</h1>
      </header>

      <main className="flex-grow-1 text-center py-5">
        <p>This is the main content area.</p>
      </main>

      <footer className="bg-success py-3 w-100">
        <div className="container-fluid">
          <div className="row">
            <div className="col">© 2025</div>
            <div className="col text-end">
              GIF credit:{" "}
              <a
                href="https://giphy.com/gifs/tomato-tomates-potager-EGzDfFUauCo6nDgfpk"
                className="text-white"
              >
                via GIPHY
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TestLayout;
