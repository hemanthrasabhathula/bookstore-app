import { Branch } from "../model/Definitions";
import StorageService from "./StorageService";
import { BRANCHES_URL, BRANCHES_LIST, API_ENDPOINT } from "../model/Constants";

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

export const fetchBranches = async (): Promise<Branch[]> => {
  const response = await fetch(BRANCHES_URL);
  if (!response.ok) {
    throw new Error("Error fetching books");
  }
  const items = await response.json();
  return items.data;
};

export const insertBranch = async (branch: Branch): Promise<Branch> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/branch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(branch),
    });
    const item = await response.json();
    const newBranch: Branch = item.data;
    return newBranch;
  } catch (error) {
    console.error("Error adding branch", error);
    throw error;
  }
};

export const removeBranchAPI = async (branchId: string): Promise<void> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/branch/${branchId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });
    if (!response.ok) {
      throw new Error("Error deleting branch");
    }
  } catch (error) {
    console.error("Error deleting branch", error);
    throw error;
  }
};
