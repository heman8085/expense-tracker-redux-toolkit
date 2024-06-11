// PrivateRoute.js
import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Component, ...rest }) => {
  const isLoggedIn = useSelector((state) => state.auth.user.email !== "");

  return isLoggedIn ? <Component {...rest} /> : <Navigate to="/auth" replace />;
};

export default PrivateRoute;
