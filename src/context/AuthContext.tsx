import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { storage } from "@/lib/utils";

interface AuthContextProps {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

interface AuthProviderProps {
  children: ReactNode;
}
const AuthContextValue = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [Loading, setLoading] = useState(true);

  const login = () => setIsAuthenticated(true);
  const logout = () => {
    storage.removeItem("token");
    setIsAuthenticated(false)
  }

  useEffect(() => {
    const token = storage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
    setLoading(false);
  }, []);

  const value = { isAuthenticated, login, logout };

  if (Loading) {
    return <div className="bg-bg min-h-screen p-5"></div>
  }

  return (
    <div className="bg-bg min-h-screen p-5">
      <AuthContextValue.Provider value={value}>
        {children}
      </AuthContextValue.Provider>
    </div>
  )
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContextValue);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
