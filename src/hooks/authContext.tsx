import { FormState } from "@/data/quizTypes";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

interface User {
  name: string;
  token: string;
}
interface AuthContextProps {
  user: User;
  login: (email: string, password: string) => void;
  loginState: FormState;
  signup: (username: string, email: string, password: string) => void;
  signupState: FormState;
  logout: () => void;
  isAuthenticated: string;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState("");
  const [user, setUser] = useState<User>({ name: "", token: "" });
  const [loginState, setLoginState] = useState<FormState>({
    loading: false,
    error: "",
  });
  const [signupState, setSignupState] = useState<FormState>({
    loading: false,
    error: "",
  });
  // login function
  const login = async (email: string, password: string) => {
    const loginData = { email, password };
    try {
      setLoginState({ error: "", loading: true });
      const response = await fetch(import.meta.env.VITE_LOGIN_URI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (
          data.error.includes(
            "getaddrinfo ENOTFOUND ac-am0iexc-shard-00-00.hd8622b.mongodb.net",
          )
        ) {
          setLoginState((prevState) => ({
            ...prevState,
            error: "Please check your connection",
          }));
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLoginState((prevState) => ({ ...prevState, error: data.error }));
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setUser({ name: data.email, token: data.token });
      localStorage.setItem("quizerUser", JSON.stringify(data));
      setIsAuthenticated(data.token);
    } catch (error) {
      console.error(error);
    } finally {
      setLoginState((prev) => ({ ...prev, loading: false }));
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      setSignupState({ error: "", loading: true });
      const signupData = { email, password, username };
      console.log(signupData);
      const response = await fetch(import.meta.env.VITE_SIGNUP_URI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      const data = await response.json();
      if (!response.ok) {
        if (
          data.error.includes(
            "getaddrinfo ENOTFOUND ac-am0iexc-shard-00-00.hd8622b.mongodb.net",
          )
        ) {
          setSignupState((prevState) => ({
            ...prevState,
            error: "Please check your connection",
          }));
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setSignupState((prevState) => ({ ...prevState, error: data.error }));
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setUser({ name: data.email, token: data.token });
      localStorage.setItem("quizerUser", JSON.stringify(data));
      setIsAuthenticated(data.token);
    } catch (error) {
      console.error(error);
    } finally {
      setSignupState((prev) => ({ ...prev, loading: false }));
    }
  };

  const logout = () => {
    localStorage.removeItem("quizerUser");
    setUser({ name: "", token: "" });
    setIsAuthenticated("");
  };

  // authenticate on reload
  useEffect(() => {
    const localUserJSON = localStorage.getItem("quizerUser");
    if (localUserJSON) {
      const localUser: User = JSON.parse(localUserJSON);
      setUser(localUser);
      setIsAuthenticated(localUser.token);
    }
  }, []);

  const contextValue: AuthContextProps = {
    user,
    login,
    loginState,
    signup,
    signupState,
    logout,
    isAuthenticated,
  };

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

// eslint-disable-next-line
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { AuthContext, AuthProvider };
