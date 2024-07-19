import { get } from "http";
import React from "react";
import StorageService from "../../utils/StorageService";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = StorageService.getUserSession();

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default RequireAuth;
