import React, { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import { booksList } from "./data/Books_dummy";
import BookList from "./components/BookGrid";
import { BookSearchForm } from "./components/search/BookSearchForm";
import { Container } from "react-bootstrap";
import { Book } from "./model/Definitions";

const App = () => {
  const [books, setBooks] = useState(booksList);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchInput = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    console.log(event.target.value);
    setSearchTerm(event.target.value);
  };
  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Clicked on Submit with ", searchTerm);
    setSearchTerm(searchTerm);
  };

  const filteredBooks: Book[] = booksList.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  return (
    <>
      <h1> L M S </h1>
      <Container className="book-list-container">
        <BookSearchForm
          searchTerm={searchTerm}
          onSearchInput={handleSearchInput}
          onSearchSubmit={handleSearchSubmit}
        />
        <BookList booklist={filteredBooks} />
      </Container>
    </>
  );
};

export default App;
