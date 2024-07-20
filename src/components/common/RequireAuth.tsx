import { get } from "http";
import React from "react";
import StorageService from "../../utils/StorageService";
import { Navigate } from "react-router-dom";
import { BOOKS_LIST, BRANCHES_LIST, CART_ITEMS } from "../../model/Constants";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const user = StorageService.getUserSession();

  if (!user) {
    StorageService.clearUserSession();
    StorageService.removeItem(CART_ITEMS);
    StorageService.removeItem(BRANCHES_LIST);
    StorageService.removeItem(BOOKS_LIST);
    return <Navigate to={"/login"} />;
  }

  return children;
};

export default RequireAuth;
