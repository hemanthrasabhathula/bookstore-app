import { API_ENDPOINT } from "../model/Constants";
import { CartItem, User } from "../model/Definitions";

export const maketransaction = async (
  cartdata: CartItem[],
  user: User
): Promise<string> => {
  const transaction_body = JSON.stringify({ cartdata, user });
  console.log("Transaction Body", transaction_body);
  try {
    const response = await fetch(`${API_ENDPOINT}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: transaction_body,
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
