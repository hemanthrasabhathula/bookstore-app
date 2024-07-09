import { FormEvent } from "react";

type Book = {
  _id: idObj;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
  branches?: Branch[];
};

type idObj = {
  $oid: string;
};

type SearchFormProps = {
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type Branch = {
  _id: idObj;
  name: string;
  address: string;
  state: string;
  zip: number;
  copies?: 0 | number;
};

type BookAndBranches = {
  _id: idObj;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
  branches: Branch[];
};

type BookContextTypeProps = {
  books: Book[];
  branches: Branch[];
  cartItems: Book[];
  addBook: (book: Book | Book[]) => void;
  addBranch: (branch: Branch | Branch[]) => void;
  addCartItems: (cartItem: Book) => void;
  removeBook: (id: string) => void;
  removeBranch: (id: string) => void;
  removeAllBooks: () => void;
  removeAllBranches: () => void;
  removeAllCartItems: () => void;
};

export type {
  Book,
  SearchFormProps,
  Branch,
  BookAndBranches,
  BookContextTypeProps,
};
