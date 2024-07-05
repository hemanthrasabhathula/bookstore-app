import { FormEvent } from "react";

type Book = {
  id: number;
  title: string;
  author: string;
  ISBN: string;
  genre: string;
  published: number;
  pages: number;
  image: string;
};

type SearchFormProps = {
  onSearchSubmit: (event: FormEvent<HTMLFormElement>) => void;
};

type Branch = {
  id: number;
  name: string;
  address: string;
  state: string;
  zip: number;
  count?: 0 | number;
};

type BookAndBranches = {
  id: number;
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
