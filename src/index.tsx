import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BookItem from "./components/book/BookItem";
import NavBar from "./navbar/navbar";
import { BookProvider } from "./components/bookcontext/BookContext";
import Cart from "./components/cart/Cart";
import AddBook from "./components/admin/addBook/AddBook";
import AddBranch from "./components/admin/addBranch/AddBranch";
import { BookStoreProvider } from "./components/bookcontext/BookStoreContext";
import TransactionComp from "./components/transaction/TransactionComp";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import RequireAuth from "./components/common/RequireAuth";
import { AuthProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <AuthProvider>
      <BookProvider>
        <BookStoreProvider>
          <NavBar>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <App />
                  </RequireAuth>
                }
              />
              <Route
                path="/books"
                element={
                  <RequireAuth>
                    <App />
                  </RequireAuth>
                }
              />
              <Route
                path="/book/:bookId"
                element={
                  <RequireAuth>
                    <BookItem />
                  </RequireAuth>
                }
              />
              <Route
                path="/cart/"
                element={
                  <RequireAuth>
                    <Cart />
                  </RequireAuth>
                }
              />
              <Route
                path="/addbook"
                element={
                  <RequireAuth>
                    <AddBook />
                  </RequireAuth>
                }
              />
              <Route
                path="/branches"
                element={
                  <RequireAuth>
                    <AddBranch />
                  </RequireAuth>
                }
              />
              <Route
                path="/transactions"
                element={
                  <RequireAuth>
                    <TransactionComp />
                  </RequireAuth>
                }
              />
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </NavBar>
        </BookStoreProvider>
      </BookProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
