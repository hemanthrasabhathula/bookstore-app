import { APIResponse, Book } from "../model/Definitions";
import StorageService from "./StorageService";
import { BOOKS_URL, BOOKS_LIST, API_ENDPOINT } from "../model/Constants";

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

export const fetchBookDataById = async (
  bookId: string
): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/book/${bookId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const api_data = (await response.json()) as APIResponse;
    if (response.status !== 200) {
      throw new Error(api_data.message);
    }
    //const api_data = (await response.json()) as APIResponse;
    api_data.status = response.status;
    return api_data;
  } catch (error) {
    console.log("Error registering user", error);
    throw error;
  }
};
