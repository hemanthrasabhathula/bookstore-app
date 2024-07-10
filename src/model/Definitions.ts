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
  count?: 0 | number;
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

export type { Book, SearchFormProps, Branch, BookAndBranches };
