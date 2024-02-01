import { ReactNode } from "react";
import { FormState } from "./quizTypes";

export interface ProviderChildrenProps {
  children: ReactNode;
}
export interface User {
  name: string;
  token: string;
}
export interface AuthContextProps {
  user: User;
  login: (email: string, password: string) => void;
  loginState: FormState;
  signup: (username: string, email: string, password: string) => void;
  signupState: FormState;
  logout: () => void;
  isAuthenticated: {
    state: string;
    loading: boolean;
  };
}
