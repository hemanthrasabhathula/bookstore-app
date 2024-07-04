import React, { createContext, useContext, useEffect, useState } from "react";
import { BookAndBranches } from "../model/Definitions";
import { timeStamp } from "console";

const BookContext = createContext<{
  bookslist: BookAndBranches[];
  updateBooklist: (books: BookAndBranches) => void;
}>({ bookslist: [], updateBooklist: () => {} });

export const useBooks = () => useContext(BookContext);

export const BookProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [bookslist, setBooksList] = useState<BookAndBranches[]>([]);

  const updateBooklist = (book: BookAndBranches) => {
    if (bookslist.length === 0) {
      setBooksList([book]);
      return;
    }
    const index = bookslist.findIndex((b) => b.id === book.id);
    if (index !== -1) {
      // If book is found, replace the old book with the new one
      bookslist.splice(index, 1, book);
      setBooksList([...bookslist]);
    } else {
      // If book is not found, push the new book into bookslist
      setBooksList((prevBooklist) => [...prevBooklist, book]);
    }
    // setBooklist((prevBooklist) => [...prevBooklist, book]);
  };

  // Load bookslist from localStorage on initial load
  useEffect(() => {
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
  }, [setBooksList]);

  // Save bookslist to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("bookslist", JSON.stringify(bookslist));
    localStorage.setItem("timestamp", new Date().getTime().toString());
  }, [bookslist]);

  return (
    <BookContext.Provider value={{ bookslist, updateBooklist }}>
      {children}
    </BookContext.Provider>
  );
};
