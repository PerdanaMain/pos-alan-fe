import React from "react";
import ReactDOM from "react-dom/client";
import { Helmet } from "react-helmet";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import App from "./pages/App";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Helmet>
          <title>Point Of Sales</title>
        </Helmet>
        <App />
      </div>
    ),
  },
  {
    path: "/about",
    element: <h1>About</h1>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
