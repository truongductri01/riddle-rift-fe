import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  createBrowserRouter,
  RouterProvider,
  createHashRouter,
} from "react-router-dom";
import SocketTest from "./test/SocketTest";
import LandingPage from "./pages/LandingPage/LandingPage";

const router = createHashRouter([
  {
    path: "/create",
    element: <App />,
  },
  { path: "/", element: <App /> },
  { path: "/join", element: <App /> },
  { path: "/log", element: <App /> },
  { path: "/test", element: <SocketTest /> },
  { path: "/landing", element: <LandingPage /> },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  // <App />
  <RouterProvider router={router} />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
