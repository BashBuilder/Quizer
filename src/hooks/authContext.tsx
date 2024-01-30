import React, { createContext, useContext, ReactNode, useState } from "react";

interface User {
  username: string;
  token: string;
}

interface AuthContextProps {
  user?: User;
  login: (username: string, password: string) => void;
  signup: (username: string, password: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  const login = async (username: string, password: string) => {
    const loginData = { username, password };
    try {
      const response = await fetch(import.meta.env.VITE_LOGIN_URI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Contenr-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const signup = async (username: string, password: string) => {
    try {
      const signupData = { username, password };
      const response = await fetch(import.meta.env.VITE_SIGNUP_URI, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signupData),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      setUser(data);
      setIsAuthenticated(true);
    } catch (error) {
      console.error(error);
    }
  };
  const logout = () => {
    setUser({ username: "", token: "" });
    setIsAuthenticated(false);
  };

  const contextValue: AuthContextProps = {
    user,
    login,
    signup,
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
