import { Book, Branch, CartItem } from "../model/Definitions";

class StorageService {
  static getItem(key: string) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }
  static getBooks(key: string) {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as Book[]) : [];
  }

  static getBranches(key: string) {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as Branch[]) : [];
  }

  static getCartItems(key: string) {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as CartItem[]) : [];
  }

  static setItem(key: string, value: any) {
    const item = JSON.stringify(value);
    localStorage.setItem(key, item);
  }

  static removeItem(key: string) {
    localStorage.removeItem(key);
  }
}

export default StorageService;
