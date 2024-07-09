import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Book, BookContextTypeProps, Branch } from "../../model/Definitions";
import StorageService from "../../utils/StorageService";
import "../../model/Constants";
import {
  BOOKS_LIST,
  BRANCHES_LIST,
  CART_ITEMS_LIST,
} from "../../model/Constants";

const BookStoreContext = createContext<BookContextTypeProps | undefined>(
  undefined
);

export const BookStoreProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [cartItems, setCartItems] = useState<Book[]>([]);

  useEffect(() => {
    // Load books and branches from storage on initial load
    const storedBooks: Book[] = StorageService.getItem(BOOKS_LIST);
    const storedBranches: Branch[] = StorageService.getItem(BRANCHES_LIST);
    const storedCartItems: Book[] = StorageService.getItem(CART_ITEMS_LIST);
    if (storedBooks && storedBooks.length !== 0) setBooks(storedBooks);
    if (storedBranches && storedBranches.length !== 0)
      setBranches(storedBranches);
    if (storedCartItems && storedCartItems.length !== 0)
      setCartItems(storedCartItems);
  }, []);

  useEffect(() => {
    // Persist books and branches to storage on change
    if (books.length !== 0) StorageService.setItem(BOOKS_LIST, books);
    if (branches.length !== 0) StorageService.setItem(BRANCHES_LIST, branches);
    if (cartItems.length !== 0)
      StorageService.setItem(CART_ITEMS_LIST, cartItems);
  }, [books, branches, cartItems]);

  const addBook = (book: Book | Book[]) => {
    // setBooks((prevBooks) => [
    //   ...prevBooks,
    //   ...(Array.isArray(book) ? book : [book]),
    // ]);

    if (Array.isArray(book)) {
      setBooks(book);
    } else {
      setBooks((prevBooks) => [...prevBooks, book]);
    }
  };

  const addBranch = (branch: Branch | Branch[]) => {
    if (Array.isArray(branch)) {
      setBranches(branch);
    } else {
      setBranches((prevBranches) => [...prevBranches, branch]);
    }
  };

  const addCartItems = (cartItem: Book) => {
    if (cartItems.length === 0) {
      setCartItems([cartItem]);
    } else {
      const index = cartItems.findIndex(
        (item) => item._id.$oid === cartItem._id.$oid
      );

      if (index === -1) {
        setCartItems((prevCartItems) => [...prevCartItems, cartItem]);
      } else {
        if (cartItem.branches?.length === 0) {
          const updatedCartItems = [...cartItems];
          updatedCartItems.splice(index, 1);
          setCartItems(updatedCartItems);
          if (updatedCartItems.length === 0) {
            StorageService.removeItem(CART_ITEMS_LIST);
          }
        } else {
          const updatedCartItems = [...cartItems];
          updatedCartItems.splice(index, 1, cartItem);
          setCartItems(updatedCartItems);
        }
      }
    }
    console.log("Cart Items", cartItems);
  };

  const removeBook = (id: string) => {
    setBooks((prevBooks) => prevBooks.filter((book) => book._id.$oid !== id));
  };

  const removeBranch = (id: string) => {
    setBranches((prevBranches) =>
      prevBranches.filter((branch) => branch._id.$oid !== id)
    );
  };

  const removeAllBooks = () => {
    setBooks([]);
    StorageService.removeItem(BOOKS_LIST);
  };

  const removeAllBranches = () => {
    setBranches([]);
    StorageService.removeItem(BRANCHES_LIST);
  };

  const removeAllCartItems = () => {
    setCartItems([]);
    StorageService.removeItem(CART_ITEMS_LIST);
  };

  return (
    <BookStoreContext.Provider
      value={{
        books,
        branches,
        cartItems,
        addBook,
        addBranch,
        addCartItems,
        removeBook,
        removeBranch,
        removeAllBooks,
        removeAllBranches,
        removeAllCartItems,
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
};

export const useBooksAndBraches = () => {
  const context = useContext(BookStoreContext);
  if (context === undefined)
    throw new Error(
      "useBooksAndBranches must be used within a BookStoreProvider"
    );

  return context;
};
