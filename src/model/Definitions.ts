import { FormEvent } from "react";
import AddBranch from "../components/admin/addBranch/AddBranch";

type Book = {
  _id: IdObj;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
};

type IdObj = {
  $oid: string;
};

type SearchFormProps = {
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type Branch = {
  _id: IdObj;
  name: string;
  address: string;
  state: string;
  zip: number;
  count?: 0 | number;
};

type BookAndBranches = {
  _id: IdObj;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
  branches: Branch[];
};

type CartItem = {
  book: Book;
  branches: Branch[];
};

type BookStoreContextProps = {
  books: Book[];
  branches: Branch[];
  cartItems: CartItem[];
  addBooks: (book: Book | Book[]) => void;
  addBranches: (branch: Branch | Branch[]) => void;
  removeBranch: (branchId: string) => void;
  addToCart: (book: Book, branch: Branch) => void;
  clearCart: () => void;
};

export type {
  Book,
  SearchFormProps,
  Branch,
  BookAndBranches,
  CartItem,
  BookStoreContextProps,
};
