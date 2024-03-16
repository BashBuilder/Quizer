import {
  ProviderChildrenProps,
  // User,
} from "@/data/authTypes";
import { JambContextProps } from "@/data/jambTypes";
import React, { createContext, useContext } from "react";

const JambContext = createContext<JambContextProps | undefined>(undefined);

const JambProvider: React.FC<ProviderChildrenProps> = ({ children }) => {
  const jambContextValue: JambContextProps = {
    aa: "",
  };

  return (
    <JambContext.Provider value={jambContextValue}>
      {children}
    </JambContext.Provider>
  );
};

// eslint-disable-next-line
export const useAuthContext = () => {
  const context = useContext(JambContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
};

export { JambContext, JambProvider };
