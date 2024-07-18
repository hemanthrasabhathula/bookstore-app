import { API_ENDPOINT } from "../model/Constants";
import { APIResponse, UserRegister } from "../model/Definitions";

export const RegisterUserAPI = async (
  user: UserRegister
): Promise<APIResponse> => {
  try {
    const response = await fetch(`${API_ENDPOINT}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const api_data = (await response.json()) as APIResponse;
    if (!response.ok) {
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
