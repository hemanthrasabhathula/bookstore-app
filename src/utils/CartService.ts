import { API_ENDPOINT } from "../model/Constants";
import { CartItem } from "../model/Definitions";

export const maketransaction = async (
  cartdata: CartItem[]
): Promise<string> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(cartdata),
    });
    if (response.status !== 201) {
      throw new Error("Error while making transaction");
    }
    const item = await response.json();
    return item.message;
  } catch (error) {
    console.error("Error while purchasing", error);
    throw error;
  }
};
