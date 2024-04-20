import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter  , Route , createRoutesFromElements } from "react-router-dom";
import Aboutus from "./components/AboutUs/Aboutus.jsx";
import Home from "./components/OldHome/Home.jsx";
import Login from "./components/Login.jsx";
import Input_amcat from "./components/Amcat/Input_amcat.jsx";
import UniversityPage from "./components/University/UniversityPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/about", element: <Aboutus /> },
      {path: "/amcat" , element: <Input_amcat/>},
      {path: "/university" , element: <UniversityPage/>}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* <App /> */}
    <RouterProvider router={router} />
  </React.StrictMode>
);
