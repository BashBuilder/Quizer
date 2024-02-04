import {
  AuthContextProps,
  ProviderChildrenProps,
  User,
} from "@/data/authTypes";
import { FormState } from "@/data/quizTypes";
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<ProviderChildrenProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<{
    state: boolean;
    loading: boolean;
  }>({ state: false, loading: true });
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
        if (data.error.includes("getaddrinfo ENOTFOUND ac-am0iexc")) {
          setLoginState((prevState) => ({
            ...prevState,
            error: "Please check your connection",
          }));
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setLoginState((prevState) => ({ ...prevState, error: data.error }));
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = { name: data.username, token: data.token };
      setUser(userData);
      localStorage.setItem("quizerUser", JSON.stringify(userData));
      setIsAuthenticated((prev) => ({ ...prev, state: data.token !== "" }));
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
        if (data.error.includes("getaddrinfo ENOTFOUND ac-am0iexc")) {
          setSignupState((prevState) => ({
            ...prevState,
            error: "Please check your connection",
          }));
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setSignupState((prevState) => ({ ...prevState, error: data.error }));
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const userData = { name: data.username, token: data.token };
      setUser(userData);
      localStorage.setItem("quizerUser", JSON.stringify(userData));
      setIsAuthenticated((prev) => ({ ...prev, state: data.token !== "" }));
    } catch (error) {
      console.error(error);
    } finally {
      setSignupState((prev) => ({ ...prev, loading: false }));
    }
  };

  const logout = () => {
    localStorage.removeItem("quizerUser");
    setUser({ name: "", token: "" });
    setIsAuthenticated({ state: false, loading: false });
  };
  // authenticate on reload
  useEffect(() => {
    setIsAuthenticated({ state: false, loading: true });
    const localUserJSON = localStorage.getItem("quizerUser");
    let localUser: User;
    if (localUserJSON) {
      localUser = JSON.parse(localUserJSON);
      setUser(localUser);
      setIsAuthenticated((prev) => ({
        ...prev,
        state: localUser.token !== "",
      }));
    }
    setIsAuthenticated((prev) => ({ ...prev, loading: false }));
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
    <AuthContext.Provider value={contextValue}>
      {!isAuthenticated.loading && children}
    </AuthContext.Provider>
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
