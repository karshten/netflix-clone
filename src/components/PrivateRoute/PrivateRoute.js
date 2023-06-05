import React from "react";
import { PATH } from "../../constants/constants";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoute = ({children}) => {
  const { user } = useSelector(state => state.auth);

  if (!user) return <Navigate to={PATH.guest} replace />
  return children;
};
