import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import GetQuiz from "./routes/GetQuiz";
import Result from "./routes/Result";
import { useAuthContext } from "./hooks/authContext";
import AnswerQuiz from "./routes/AnswerQuiz";

function App() {
  const { isAuthenticated } = useAuthContext();
  return (
    <main className="mx-auto max-w-[92rem]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/auth"
            element={!isAuthenticated ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/quiz"
            element={isAuthenticated ? <GetQuiz /> : <Navigate to="/auth" />}
          />
          <Route
            path="/answerQuiz"
            element={isAuthenticated ? <AnswerQuiz /> : <Navigate to="/auth" />}
          />
          <Route
            path="/result"
            element={isAuthenticated ? <Result /> : <Navigate to="/auth" />}
          />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
