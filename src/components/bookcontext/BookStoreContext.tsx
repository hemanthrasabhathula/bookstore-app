import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  Book,
  BookStoreContextProps,
  Branch,
  CartItem,
} from "../../model/Definitions";
import { fetchBooks } from "../../utils/BookService";
import StorageService from "../../utils/StorageService";
import "../../model/Constants";
import { BOOKS_LIST, BRANCHES_LIST, CART_ITEMS } from "../../model/Constants";
import { fetchAndSetBooks } from "../../utils/BookService";
import { fetchAndSetBranches } from "../../utils/BranchService";
const BookStoreContext = createContext<BookStoreContextProps | undefined>(
  undefined
);

const BookStoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [books, setBooks] = useState<Book[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    console.log("BookStoreProvider useEffect default fetch");

    if (books.length === 0) {
      if (StorageService.getBooks(BOOKS_LIST).length === 0) {
        fetchAndSetBooks().then((fetchedBooks) => setBooks(fetchedBooks));
      } else setBooks(StorageService.getBooks(BOOKS_LIST));
    }

    if (branches.length === 0) {
      if (StorageService.getBranches(BRANCHES_LIST).length === 0) {
        fetchAndSetBranches().then((fetchAndSetBranches) =>
          setBranches(fetchAndSetBranches)
        );
      } else setBranches(StorageService.getBranches(BRANCHES_LIST));
    }

    if (cartItems.length === 0) {
      const storedCartItems = StorageService.getCartItems(CART_ITEMS);
      if (storedCartItems.length !== 0) setCartItems(storedCartItems);
    }
  }, []);

  useEffect(() => {
    if (books.length !== 0) StorageService.setItem(BOOKS_LIST, books);
  }, [books]);

  useEffect(() => {
    if (branches.length !== 0) StorageService.setItem(BRANCHES_LIST, branches);
  }, [branches]);

  useEffect(() => {
    if (cartItems.length !== 0) StorageService.setItem(CART_ITEMS, cartItems);
    else StorageService.removeItem(CART_ITEMS);
  }, [cartItems]);

  const addBooks = (book: Book | Book[]) => {
    if (Array.isArray(book)) {
      setBooks((prevBooks) => [...prevBooks, ...book]);
    } else {
      setBooks((prevBooks) => [...prevBooks, book]);
    }
  };

  const addBranches = (branch: Branch | Branch[]) => {
    if (Array.isArray(branch)) {
      setBranches((prevBranches) => [...prevBranches, ...branch]);
    } else {
      setBranches((prevBranches) => [...prevBranches, branch]);
    }
  };

  const removeBranch = (branchId: string) => {
    const updatedBranches = branches.filter(
      (branch) => branch._id.$oid !== branchId
    );

    setBranches(updatedBranches);
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const addToCart = (book: Book, branch: Branch) => {
    const cartItem: CartItem = { book, branches: [branch] };
    if (cartItems.length === 0) {
      setCartItems([cartItem]);
    } else {
      const cartItemFound = cartItems.find(
        (item) => item.book._id.$oid === book._id.$oid
      );
      if (cartItemFound) {
        const branchFound = cartItemFound.branches.find(
          (b) => b._id.$oid === branch._id.$oid
        );
        if (branchFound) {
          const updatedBranches = cartItemFound.branches;
          if (branch.count === 0) {
            updatedBranches.splice(updatedBranches.indexOf(branchFound), 1);
          } else {
            updatedBranches.splice(
              updatedBranches.indexOf(branchFound),
              1,
              branch
            );
          }
          if (updatedBranches.length === 0) {
            setCartItems(
              cartItems.filter((item) => item.book._id.$oid !== book._id.$oid)
            );
          } else {
            const updatedCartItem = { book, branches: updatedBranches };

            const updatedCartItems = [...cartItems];
            updatedCartItems.splice(
              updatedCartItems.indexOf(cartItemFound),
              1,
              updatedCartItem
            );
            setCartItems(updatedCartItems);
          }
        } else {
          const updatedBranches = cartItemFound.branches;
          updatedBranches.push(branch);
          const updatedCartItem = { book, branches: updatedBranches };
          const updatedCartItems = [...cartItems];
          updatedCartItems.splice(
            updatedCartItems.indexOf(cartItemFound),
            1,
            updatedCartItem
          );
          setCartItems(updatedCartItems);
        }
      } else {
        setCartItems((prevCartItem) => [...prevCartItem, cartItem]);
      }
    }
  };

  return (
    <BookStoreContext.Provider
      value={{
        books,
        branches,
        cartItems,
        addBooks,
        addBranches,
        removeBranch,
        addToCart,
        clearCart,
      }}
    >
      {children}
    </BookStoreContext.Provider>
  );
};

const useBookStoreContext = () => {
  const context = useContext(BookStoreContext);
  if (context === undefined)
    throw new Error(
      "useBooksAndBranches must be used within a BookStoreProvider"
    );

  return context;
};

export { BookStoreProvider, useBookStoreContext };
