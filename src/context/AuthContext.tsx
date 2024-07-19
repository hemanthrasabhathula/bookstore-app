import { createContext, useContext, useState } from "react";
import { User } from "../model/Definitions";
import StorageService from "../utils/StorageService";

interface AuthContextProps {
  user: User | null;
  login: (user: User, expiryTime: number) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: JSX.Element }) => {
  const [user, setUser] = useState<User | null>(
    StorageService.getUserSession()
  );

  const login = (user: User, expiryTime: number) => {
    StorageService.setUserSession(user, expiryTime);
    setUser(user);
  };

  const logout = () => {
    StorageService.clearUserSession();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
