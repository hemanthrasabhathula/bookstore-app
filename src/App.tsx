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
    changeGradient();
  }, []);

  const generateRandomGradient = () => {
    const colors = [
      "#FF5733",
      "#33FF57",
      "#3357FF",
      "#F333FF",
      "#FF33A5", // Existing
      "#FF6F61",
      "#6B5B95",
      "#88B04B",
      "#F7CAC9",
      "#92A8D1", // Additional
      "#D64161",
      "#FFDDC1",
      "#6B4226",
      "#D9BF77",
      "#D5AAFF", // Additional
      "#FFABAB",
      "#FFC3A0",
      "#B9FBC0",
      "#B9E3C6",
      "#FFE156", // Additional
      "#F5B9B2",
      "#F0E5CF",
      "#C9B4A5",
      "#A2A2A2",
      "#B0A7A3", // Additional
    ];

    const colors2 = [
      "#F9DBBA",
      "#5B99C2",
      "#F7EFE5",
      "#E2BFD9",
      "#C8A1E0",
      "#674188",
      "#FFDFD6",
      "#E3A5C7",
      "#B692C2",
      "#694F8E",
      "#FEFAF6",
      "#EADBC8",
      "#102C57",
      "#F5EEE6",
      "#FFF8E3",
      "#F3D7CA",
      "#E6A4B4",
      "#BC9F8B",
      "#B5CFB7",
      "#CADABF",
      "#E7E8D8",
      "#987D9A",
      "#BB9AB1",
      "#CDFADB",
      "#FF8080",
      "#FFFBF5",
      "#DAC0A3",
      "#E78895",
      "#74512D",
      "#8E7AB5",
    ];
    const color1 = colors2[Math.floor(Math.random() * colors2.length)];
    let color2;
    do {
      color2 = colors2[Math.floor(Math.random() * colors2.length)];
    } while (color2 === color1);
    return `linear-gradient(45deg, ${color1}, ${color2})`;
  };

  const [gradient, setGradient] = useState(generateRandomGradient());

  const changeGradient = () => {
    setGradient(generateRandomGradient());
  };
  return (
    <div style={{ background: "#EDF9FC" }}>
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
    </div>
  );
};

export default App;
