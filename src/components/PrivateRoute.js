import React from "react";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({children, condition, navigatePath }) => {
  
  if (!condition) return <Navigate to={navigatePath} replace/>;

  return children;
};
