export const API_ENDPOINT = "http://localhost:5000/api";

export const BOOKS_LIST = "bookslist";
export const BRANCHES_LIST = "brancheslist";
export const CART_ITEMS = "cartitems";
export const TIMESTAMP = "timestamp";
export const BOOKS = "books";
export const BRANCHES = "branches";
export const CART = "cart";
export const BOOKS_URL = `${API_ENDPOINT}/books`;
export const BRANCHES_URL = `${API_ENDPOINT}/branches`;
export const CART_URL = `${API_ENDPOINT}/cart`;
export const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"; // API endpoint

// export const BOOK_INFO_PROMPT = `Give me information of the Book : "your-book-title" Exactly in the below JSON format nothing else should be present in the output
// {
// "title": "The Alchemist",
//             "author": "Paulo Coelho",
//             "ISBN": "978-0062315007",
//             "genre": "Fiction",
//             "published": 1988,
//             "pages": 489,
//             "image": "https://images-na.ssl-images-amazon.com/images/I/71aFt4+OTOL.jpg"
// }`;

export const BOOK_INFO_PROMPT =
  "Provide the book details for :your-book-title in a single-line JSON format without any extra text or newline characters. The JSON should include fields: title, author, ISBN (in the format 123-123456789), genre (comma seperated string), published (only year), pages, and image.";

export const SESSION_KEY = "userSession";

const one_hr = 1000 * 60 * 60;
const five_min = 1000 * 60 * 5;
const fifteen_min = 1000 * 60 * 15;
export const SESSION_TIMEOUT = fifteen_min;
