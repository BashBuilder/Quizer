import { ReactNode } from "react";
import { FormState } from "./quizTypes";

export interface ProviderChildrenProps {
  children: ReactNode;
}
export interface User {
  name: string;
  token: string;
  email: string;
}
export interface AuthContextProps {
  user: User;
  login: (email: string, password: string) => void;
  loginState: FormState;
  signup: (username: string, email: string, password: string) => void;
  signupState: FormState;
  logout: () => void;
  isAuthenticated: {
    state: boolean;
    loading: boolean;
    isEmailVerified: boolean;
  };
  isLogin: boolean;
  changeLoginState: () => void;
  trialsDb: { databaseID: string; trials: number };
  setTrialsDb: React.Dispatch<
    React.SetStateAction<{
      databaseID: string;
      trials: number;
    }>
  >;
}
