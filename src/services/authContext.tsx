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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("AUTH_IZY_TASK")
  );

  const handleSetToken = (newToken: string) => {
    localStorage.setItem("AUTH_IZY_TASK", newToken);
    console.log(
      "Token saved to localStorage: ",
      localStorage.getItem("AUTH_IZY_TASK")
    );
    setToken(newToken);
  };

  const handleRemoveToken = () => {
    localStorage.removeItem("AUTH_IZY_TASK");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        setToken: handleSetToken,
        removeToken: handleRemoveToken,
      }}
    >
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
