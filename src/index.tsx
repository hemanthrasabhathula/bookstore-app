import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import BookItem from "./book/BookItem";
import NavBar from "./navbar/navbar";
import { BookProvider } from "./bookcontext/BookContext";
import Cart from "./cart/Cart";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>

  <BrowserRouter>
    <BookProvider>
      <NavBar>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/book/:bookId" element={<BookItem />} />
          <Route path="/cart/" element={<Cart />} />
        </Routes>
      </NavBar>
    </BookProvider>
  </BrowserRouter>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
