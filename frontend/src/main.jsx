import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { RouterProvider, createBrowserRouter  } from "react-router-dom";
import Aboutus from "./components/AboutUs/Aboutus.jsx";
import Home from "./components/OldHome/Home.jsx";
// import Login from "./components/Login.jsx";
import Input_amcat from "./components/Amcat/Input_amcat.jsx";
import UniversityPage from "./components/University/UniversityPage.jsx";
import { Auth0Provider } from '@auth0/auth0-react';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
    
      { path: "/about", element: <Aboutus /> },
      {path: "/amcat" , element: <Input_amcat/>},
      {path: "/university" , element: <UniversityPage/>}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-gdg1porumkugbu6s.us.auth0.com"
    clientId="EaGQKsWcjnCLNyyVAFThIwaV8huMKmmP"
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
  >
   
  
    {/* <App /> */}
    <RouterProvider router={router} />
    
  </Auth0Provider>,
);
