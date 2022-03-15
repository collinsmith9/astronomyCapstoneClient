import React from "react";
import { Route, Redirect } from "react-router-dom";
import Login from "./auth/Login";

import { ApplicationViews } from "./ApplicationViews";
import Register from "./auth/Register";
import NavBar from "./nav/NavBar";
// import { Footer } from "./footer/Footer";


export const AstronomySite = () => {

  return (
  <>
   <Route
    render={() => {
      if (localStorage.getItem("astronomer")) {
        return (
          <>
            <NavBar />
            <ApplicationViews />
          </>
        );
      } else {
        return <Redirect to="/login" />;
      }
    }}
  />

  <Route path="/login">
      <Login />
  </Route>
  <Route path="/register">
      <Register />
  </Route>
      
          

  </>


  )

}