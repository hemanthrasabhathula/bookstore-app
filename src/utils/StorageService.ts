import { SESSION_KEY, SESSION_TIMEOUT } from "../model/Constants";
import { Book, Branch, CartItem, User } from "../model/Definitions";

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

  static setUserSession = (user: User, expires: number) => {
    const now = new Date();
    const item = {
      user: user,
      expires: now.getTime() + expires,
    };
    localStorage.setItem(SESSION_KEY, JSON.stringify(item));
  };

  static getUserSession = () => {
    const itemStr = localStorage.getItem(SESSION_KEY);
    if (!itemStr) return null;
    const item = JSON.parse(itemStr) as { user: User; expires: number };
    const now = new Date();
    if (now.getTime() > item.expires) {
      localStorage.removeItem(SESSION_KEY);
      return null;
    }
    return item.user;
  };

  static clearUserSession = () => {
    localStorage.removeItem(SESSION_KEY);
  };
}

export default StorageService;
