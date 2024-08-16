import { API_ENDPOINT } from "../model/Constants";
import { APIResponse } from "../model/Definitions";

export const GetQuotesAPI = async (bookId: string): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/quotes/${bookId}`, {
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
