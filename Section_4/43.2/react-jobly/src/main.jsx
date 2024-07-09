import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx"
import CompanyList from "./routes/CompanyList.jsx"
import JobList from "./routes/JobList.jsx"
import Profile from "./routes/Profile.jsx"
import "./index.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/companies",
    element: <CompanyList />
  },
  {
    path: "/jobs",
    element: <JobList />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "*",
    element: <App />
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
