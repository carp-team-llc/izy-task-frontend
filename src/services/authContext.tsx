import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setUpdateToken] = useState<string | null>(
    localStorage.getItem("AUTH_IZY_TASK") || null
  );

  useEffect(() => {
    const storedToken = localStorage.getItem("AUTH_IZY_TASK") || null;
    setUpdateToken(storedToken);
    setIsLoggedIn(!!storedToken);
  }, []);

  const handleSetToken = (newToken: string) => {
    localStorage.setItem("AUTH_IZY_TASK", newToken);
    setUpdateToken(newToken);
    setIsLoggedIn(true);
  };

  const isAuthenticated = !!token;

  const handleRemoveToken = () => {
    localStorage.removeItem("AUTH_IZY_TASK");
    setUpdateToken(null);
    setIsLoggedIn(false);
  };

  const login = () => {};

  const logout = () => {
    handleRemoveToken();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        setToken: handleSetToken,
        removeToken: handleRemoveToken,
        isLoggedIn,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { useAuth, AuthProvider };
