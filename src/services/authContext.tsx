import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

interface AuthContextType {
  token: string | null;
  setToken: (token: string) => void;
  removeToken: () => void;
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setUpdateToken] = useState<string | null>(
    localStorage.getItem("AUTH_IZY_TASK")
  );

  const handleSetToken = (newToken: string) => {
    localStorage.setItem("AUTH_IZY_TASK", newToken);
    console.log(
      "Token saved to localStorage: ",
      localStorage.getItem("AUTH_IZY_TASK")
    );
    setUpdateToken(newToken);
    setIsLoggedIn(true); 
  };

  const handleRemoveToken = () => {
    localStorage.removeItem("AUTH_IZY_TASK");
    setUpdateToken(null);
    setIsLoggedIn(false); 
  };

  const login = () => {
    
  };

  const logout = () => {
    handleRemoveToken();
  };

  return (
    <AuthContext.Provider
      value={{
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

export default useAuth;
