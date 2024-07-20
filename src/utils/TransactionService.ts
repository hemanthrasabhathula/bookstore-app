import { API_ENDPOINT } from "../model/Constants";
import { Transaction } from "../model/Definitions";

export const fetchTransactions = async (): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/transactions`);
    if (!response.ok) {
      throw new Error("Error fetching transactions");
    }
    const items = await response.json();
    return items.data as Transaction[];
  } catch (error) {
    console.error("Error fetching transactions", error);
    throw error;
  }
};

export const fetchUserTransactions = async (
  userId: string
): Promise<Transaction[]> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/transactions/${userId}`);
    if (!response.ok) {
      throw new Error("Error fetching transactions");
    }
    const items = await response.json();
    return items.data as Transaction[];
  } catch (error) {
    console.error("Error fetching transactions", error);
    throw error;
  }
};

export const returnCopyTransaction = async (
  copy_id: string
): Promise<string> => {
  try {
    const response = await fetch(
      `${API_ENDPOINT}/transactions/return/${copy_id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
      }
    );
    if (!response.ok) {
      throw new Error("Error returning copy");
    }
    const item = await response.json();
    return item.message as string;
  } catch (error) {
    console.error("Error returning copy", error);
    throw error;
  }
};
