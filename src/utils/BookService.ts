import { Book } from "../model/Definitions";
import StorageService from "./StorageService";
import { BOOKS_URL, BOOKS_LIST } from "../model/Constants";

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(BOOKS_URL);
  if (!response.ok) {
    throw new Error("Error fetching books");
  }
  const items = await response.json();
  return items.data;
};

export const fetchAndSetBooks = async () => {
  try {
    const response = await fetchBooks();
    StorageService.setItem(BOOKS_LIST, response);
    return response;
  } catch (error) {
    console.error("Error fetching books", error);
    return [];
  }
};
