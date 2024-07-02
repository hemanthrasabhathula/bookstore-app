import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
import { booksList } from "./data/Books_dummy";
import { BookSearchForm } from "./components/search/BookSearchForm";
import { Container, Row } from "react-bootstrap";
import { Book } from "./model/Definitions";
import BookList from "./bookgrid/BookGrid";

const App = () => {
  console.log("App");
  const [books, setBooks] = useState<Book[]>([]);
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

  const filteredBooks: Book[] = books.filter((book) =>
    book.title
      .replaceAll(" ", "")
      .toLowerCase()
      .includes(searchTerm.replaceAll(" ", "").toLowerCase())
  );

  useEffect(() => {
    setBooks(booksList);
  }, []);

  return (
    <>
      <Container className="book-list-container">
        <Row lg={2} sm={1} className="justify-content-center">
          <BookSearchForm
            searchTerm={searchTerm}
            onSearchInput={handleSearchInput}
            onSearchSubmit={handleSearchSubmit}
          />
        </Row>
        <Row>
          {filteredBooks.length === 0 ? ( // If no books are found, display a message to the user
            <h2>No books found</h2>
          ) : (
            <BookList booklist={filteredBooks} />
          )}
        </Row>
      </Container>
    </>
  );
};

export default App;
