import { GROQ_API_URL } from "../model/Constants";
import { APIData } from "../model/Definitions";

export const PromptService = async (data: APIData): Promise<string> => {
  try {
    const groq_api_key = process.env.REACT_APP_GROQ_API_KEY;
    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${groq_api_key}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const json = await response.json();
    return json.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching Prompt response", error);
    throw error;
  }
};
