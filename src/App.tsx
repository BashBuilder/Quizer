import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import Quiz from "./routes/Quiz";
import Result from "./routes/Result";

function App() {
  const isAuthenticated = true;

  return (
    <main className="mx-auto max-w-[92rem]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
