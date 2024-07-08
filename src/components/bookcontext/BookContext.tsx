import React, { createContext, useContext, useEffect, useState } from "react";
import { Book, BookAndBranches, Branch } from "../../model/Definitions";

const BookContext = createContext<{
  books: Book[];
  branches: Branch[];
  bookslist: BookAndBranches[];
  setBooks: (books: Book[]) => void;
  updateBooklist: (books: BookAndBranches) => void;
  setBranches: (branches: Branch[]) => void;
  clearBooklist: () => void;
}>({
  books: [],
  branches: [],
  bookslist: [],
  setBooks: () => {},
  setBranches: () => {},
  updateBooklist: () => {},
  clearBooklist: () => {},
});

export const useBooks = () => useContext(BookContext);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookslist, setBooksList] = useState<BookAndBranches[]>([]);

  const [branches, setBranches] = useState<Branch[]>([]);

  const [books, setBooks] = useState<Book[]>([]);

  const updateBooklist = (book: BookAndBranches) => {
    if (bookslist.length === 0) {
      setBooksList([book]);
      return;
    }
    console.log("BookwithBranches", bookslist);

    const index = bookslist.findIndex((b) => b._id.$oid === book._id.$oid);
    console.log("BookwithBranches -book :: ", book, index);
    if (index !== -1) {
      // If book is found, replace the old book with the new one
      if (book.branches?.length === 0) {
        bookslist.splice(index, 1);
      } else {
        bookslist.splice(index, 1, book);
      }
      setBooksList([...bookslist]);
    } else {
      // If book is not found, push the new book into bookslist
      setBooksList((prevBooklist) => [...prevBooklist, book]);
    }
  };

  // Load bookslist from localStorage on initial load
  useEffect(() => {
    console.log("Book Context setBooksList useEffect");
    const storedBooksList = localStorage.getItem("bookslist");
    const storedTimeStamp = localStorage.getItem("timestamp");
    const currentTime = new Date().getTime();
    //console.log(JSON.stringify(storedBooksList));
    console.log("Book Context", storedBooksList, storedTimeStamp, currentTime);
    if (storedBooksList && storedTimeStamp) {
      const timeDiff =
        (currentTime - parseInt(storedTimeStamp, 10)) / (1000 * 60);
      console.log("Time Diff", timeDiff, timeDiff <= 1);
      if (timeDiff <= 1) setBooksList(JSON.parse(storedBooksList));
    }
  }, []);

  // Save bookslist to localStorage whenever it changes
  useEffect(() => {
    console.log("Book Context bookslist useEffect");
    localStorage.setItem("bookslist", JSON.stringify(bookslist));
    localStorage.setItem("timestamp", new Date().getTime().toString());
  }, [bookslist]);

  const clearBooklist = () => {
    setBooksList([]);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        branches,
        bookslist,
        setBooks,
        setBranches,
        updateBooklist,
        clearBooklist,
      }}
    >
      {children}
    </BookContext.Provider>
  );
};
