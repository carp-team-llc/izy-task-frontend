import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { notifyError, notifySuccess } from "../component/toastify/Toastify";
import UseLogOut from "../hook/Api/auth/useLogout";
import UseCheckLogin from "../hook/Api/auth/useCheckLogin";

interface AuthContextType {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  refetchAuth: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { onLogout } = UseLogOut();
  const { me } = UseCheckLogin();

  const isUserLoggedIn = async () => {
    try {
      const res = await me();
      if (res?.isLogin) {
        setIsLoggedIn(true);
        setIsAuthenticated(true);
      } else {
        setIsLoggedIn(false);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("User not logged in!");
      setIsAuthenticated(false);
      setIsLoggedIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    isUserLoggedIn();
  }, []);

  const login = () => {};

  const logout = () => {
    try {
      onLogout();
      notifySuccess("Logout success!");
      setIsAuthenticated(false);
      setIsLoggedIn(false);
    } catch (err) {
      notifyError("Error!");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoggedIn,
        login,
        logout,
        refetchAuth: isUserLoggedIn,
        isLoading,
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
