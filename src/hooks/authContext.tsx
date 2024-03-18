import {
  AuthContextProps,
  ProviderChildrenProps,
  User,
} from "@/data/authTypes";
import { FormState } from "@/data/quizTypes";
import { auth, db } from "@/utils/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getDocs } from "firebase/firestore";
import React, {
  createContext,
  useContext,
  useState,
  useLayoutEffect,
} from "react";

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const AuthProvider: React.FC<ProviderChildrenProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<{
    state: boolean;
    loading: boolean;
    isEmailVerified: boolean;
  }>({ state: false, loading: true, isEmailVerified: false });

  const [user, setUser] = useState<User>({
    name: "",
    token: "",
    email: "",
  });
  const [loginState, setLoginState] = useState<FormState>({
    loading: false,
    error: "",
  });
  const [signupState, setSignupState] = useState<FormState>({
    loading: false,
    error: "",
  });
  const [trialsDb, setTrialsDb] = useState<{
    databaseID: string;
    trials: number;
  }>({ databaseID: "", trials: 0 });
  const [isLogin, setIsLogin] = useState(true);

  const changeLoginState = () => setIsLogin((prev) => !prev);
  // login function
  const login = async (email: string, password: string) => {
    try {
      setLoginState({ error: "", loading: true });
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      // @ts-expect-error "error is invalid"
      const message = error.message;
      if (message.includes("network")) {
        setLoginState((prev) => ({
          ...prev,
          error: "Check your Network connection",
        }));
      } else if (message.includes("invalid-credential")) {
        setLoginState((prev) => ({
          ...prev,
          error: "Invalid Email or Password",
        }));
      } else {
        setLoginState((prev) => ({ ...prev, error: message }));
      }
    } finally {
      setLoginState((prev) => ({ ...prev, loading: false }));
    }
  };

  const signup = async (email: string, password: string, username: string) => {
    try {
      setSignupState({ error: "", loading: true });
      // FIREBSE SIGN UP SECTION DOWN HERE
      const user = await createUserWithEmailAndPassword(auth, email, password);
      const userId = user.user.uid;
      await sendEmailVerification(user.user);
      const usersDb = collection(db, "users");
      await addDoc(usersDb, {
        userId: userId,
        userEmail: user.user.email,
        username,
        trials: 0,
      });
      alert("Email Verification sent");
      const userData = {
        name: username,
        token: user.user.refreshToken,
        email: user.user.email ? user.user.email : "",
      };
      setUser(userData);
      localStorage.setItem("quizerUser", JSON.stringify(userData));
      setIsAuthenticated((prev) => ({
        ...prev,
        state: user.user.refreshToken !== "",
        isEmailVerified: user.user.emailVerified,
      }));
    } catch (error) {
      //@ts-expect-error "error message is not a string"
      const message = error.message;
      if (message.includes("network")) {
        setSignupState((prev) => ({
          ...prev,
          error: "Check your Network connection",
        }));
      } else if (message.includes("invalid-credential")) {
        setSignupState((prev) => ({
          ...prev,
          error: "Wrong Email or Password",
        }));
      } else if (message.includes("email-already-in-use")) {
        setSignupState((prev) => ({ ...prev, error: "Email already in use" }));
      } else {
        setSignupState((prev) => ({ ...prev, error: message }));
      }
    } finally {
      setSignupState((prev) => ({ ...prev, loading: false }));
    }
  };

  const logout = async () => {
    localStorage.removeItem("quizerUser");
    setUser({ name: "", token: "", email: "" });
    setIsAuthenticated({
      state: false,
      loading: false,
      isEmailVerified: false,
    });
    // FIREBASE LOGOUT DOWN HERE
    await signOut(auth);
  };
  // authenticate on reload
  useLayoutEffect(() => {
    setIsAuthenticated({ state: false, loading: true, isEmailVerified: false });
    const localUserJSON = localStorage.getItem("quizerUser");
    let localUser: User;
    if (localUserJSON) {
      localUser = JSON.parse(localUserJSON);
      setUser(localUser);
    }
    // FIREBASE RELOAD STATUS HERE
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const newEmail = user.email ?? "";
        setUser((prev) => ({
          ...prev,
          token: user.refreshToken,
          email: newEmail,
        }));
        setIsAuthenticated((prev) => ({
          ...prev,
          state: user.refreshToken !== "",
          isEmailVerified: user.emailVerified,
        }));

        const getTrials = async () => {
          const usersDb = collection(db, "users");
          // @ts-expect-error "all user has any types handle properly next time"
          const allUsersEmail = [];
          const snapshot = await getDocs(usersDb);
          snapshot.forEach((doc) =>
            allUsersEmail.push({ id: doc.id, data: doc.data() }),
          );
          // @ts-expect-error "all user has any types handle properly next time"
          const userId = allUsersEmail.filter(
            (dbUser) => dbUser.data.userEmail === user.email,
          )[0];

          setTrialsDb({ databaseID: userId.id, trials: userId.data.trials });
          setUser((prev) => ({
            ...prev,
            name: userId.data.username,
          }));
        };
        getTrials();
      }
      setIsAuthenticated((prev) => ({ ...prev, loading: false }));
    });

    return () => unsubscribe();
  }, []);

  const contextValue: AuthContextProps = {
    user,
    login,
    loginState,
    signup,
    signupState,
    logout,
    isAuthenticated,
    isLogin,
    changeLoginState,
    trialsDb,
    setTrialsDb,
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
