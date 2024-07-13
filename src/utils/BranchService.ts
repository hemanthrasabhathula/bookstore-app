import { Branch } from "../model/Definitions";
import StorageService from "./StorageService";
import { BRANCHES_URL, BRANCHES_LIST } from "../model/Constants";

export const fetchBranches = async (): Promise<Branch[]> => {
  const response = await fetch(BRANCHES_URL);
  if (!response.ok) {
    throw new Error("Error fetching books");
  }
  const items = await response.json();
  return items.data;
};

export const fetchAndSetBranches = async () => {
  try {
    const response = await fetchBranches();
    StorageService.setItem(BRANCHES_LIST, response);
    return response;
  } catch (error) {
    console.error("Error fetching books", error);
    return [];
  }
};
