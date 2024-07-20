import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import "./App.css";
// import { booksList } from "./data/Books_dummy";
import { BookSearchForm } from "./components/search/BookSearchForm";
import { Container, Fade, Row } from "react-bootstrap";
import { Book } from "./model/Definitions";
import { API_ENDPOINT, BOOKS_LIST, BRANCHES_LIST } from "./model/Constants";
import BookList from "./components/bookgrid/BookGrid";
import { useBooks } from "./components/bookcontext/BookContext";
import { useBookStoreContext } from "./components/bookcontext/BookStoreContext";
import StorageService from "./utils/StorageService";
import { fetchAndSetBooks } from "./utils/BookService";
import { fetchAndSetBranches } from "./utils/BranchService";

const App = () => {
  console.log("App");
  //const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const { books, branches, addBooks, addBranches } = useBookStoreContext();

  if (useBookStoreContext() === undefined) {
    console.log("useBookStoreContext is undefined");
  }
  const { setBooks, setBranches } = useBooks();

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
      setBooks(items.data);
    } catch (error) {
      console.error("Error fetching books", error);
    }
  };

  const handleFetchBranches = async () => {
    try {
      const response = await fetch(`${API_ENDPOINT}/branches`);
      const items = await response.json();
      console.log("Branches Data", items.data);
      setBranches(items.data);
    } catch (error) {
      console.error("Error fetching branches", error);
    }
  };

  useEffect(() => {
    //if (books.length === 0)
    //handleFetchBooks();
    //if (branches.length === 0) handleFetchBranches();
    //setBooks(booksList); // Comment this line when using the API
    if (books.length === 0) {
      if (StorageService.getBooks(BOOKS_LIST).length === 0) {
        fetchAndSetBooks().then((fetchedBooks) => addBooks(fetchedBooks));
      } else addBooks(StorageService.getBooks(BOOKS_LIST));
    }

    if (branches.length === 0) {
      if (StorageService.getBranches(BRANCHES_LIST).length === 0) {
        fetchAndSetBranches().then((fetchAndSetBranches) =>
          addBranches(fetchAndSetBranches)
        );
      } else addBranches(StorageService.getBranches(BRANCHES_LIST));
    }
  }, []);

  return (
    <>
      <Fade appear in={true}>
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
      </Fade>
    </>
  );
};

export default App;
