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

export type { Book, SearchFormProps };
