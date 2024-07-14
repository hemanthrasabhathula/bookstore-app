import { API_ENDPOINT } from "../model/Constants";
import { Copy } from "../model/Definitions";
export const addCopies = async (copydata: Copy): Promise<Copy> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/addcopy`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(copydata),
    });
    const item = await response.json();
    return item.data;
  } catch (error) {
    console.error("Error adding branch", error);
    throw error;
  }
};
