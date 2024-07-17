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

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <BookProvider>
      <BookStoreProvider>
        <NavBar>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/book/:bookId" element={<BookItem />} />
            <Route path="/cart/" element={<Cart />} />
            <Route path="/addbook" element={<AddBook />} />
            <Route path="/addbranch" element={<AddBranch />} />
            <Route path="/transactions" element={<TransactionComp />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<h1>Not Found</h1>} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </NavBar>
      </BookStoreProvider>
    </BookProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
