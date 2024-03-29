import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { AuthProvider } from "./hooks/authContext.tsx";
import { QuizProvider } from "./hooks/quizContext.tsx";
import { JambProvider } from "./hooks/jambContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <QuizProvider>
        <JambProvider>
          <App />
        </JambProvider>
      </QuizProvider>
    </AuthProvider>
  </React.StrictMode>,
);
