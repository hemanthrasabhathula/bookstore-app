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

export const SESSION_KEY = "userSession";

const one_hr = 1000 * 60 * 60;
const five_min = 1000 * 60 * 5;
const fifteen_min = 1000 * 60 * 15;
export const SESSION_TIMEOUT = fifteen_min;
