import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
// import { booksList } from "./data/Books_dummy";
import { BookSearchForm } from "./components/search/BookSearchForm";
import { Container, Row } from "react-bootstrap";
import { Book, Branch } from "./model/Definitions";
import { API_ENDPOINT, BOOKS_LIST, BRANCHES_LIST } from "./model/Constants";
import BookList from "./components/bookgrid/BookGrid";
import { useBooks } from "./components/bookcontext/BookContext";
import { useBooksAndBraches } from "./components/bookcontext/BookStoreContext";
import StorageService from "./utils/StorageService";

const App = () => {
  console.log("App");
  //const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  //const { books, branches, setBooks, setBranches } = useBooks();

  const { books, branches, addBook, addBranch } = useBooksAndBraches();

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

  const handleFetchBooks = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/books`);
      const items = await response.json();
      console.log("Books Data", items.data);
      addBook(items.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleFetchBranches = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/branches`);
      const items = await response.json();
      console.log("Branches Data", items.data);
      addBranch(items.data);
    } catch (error) {
      console.error("Error fetching branches", error);
    }
  };

  useEffect(() => {
    const storedBooks = StorageService.getItem(BOOKS_LIST);
    if (!storedBooks) handleFetchBooks();
    const storedBranches = StorageService.getItem(BRANCHES_LIST);
    if (!storedBranches) handleFetchBranches();
    //setBooks(booksList); // Comment this line when using the API
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
