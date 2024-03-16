import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";
import GetQuiz from "./routes/GetQuiz";
import Result from "./routes/Result";
import { useAuthContext } from "./hooks/authContext";
import AnswerQuiz from "./routes/AnswerQuiz";
import Dashboard from "./routes/Dashboard";
import Navbar from "./components/Navbar";
import How from "./routes/How";
import About from "./routes/About";
import JambForm from "./components/JambForm";
import VerifyEmail from "./routes/verifyEmail";

function App() {
  const { isAuthenticated } = useAuthContext();
  const { state: auth, isEmailVerified } = isAuthenticated;
  return (
    <BrowserRouter>
      <main className="relative mx-auto max-w-[92rem]">
        <img
          src="assets/bg.png"
          alt="background"
          className="absolute -z-10 h-screen w-full object-cover opacity-10"
        />
        {/* {!isNavbarShown && <Navbar />} */}
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/how" element={<How />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/auth"
            element={!auth ? <Auth /> : <Navigate to="/" />}
          />
          <Route
            path="/quiz"
            element={auth ? <GetQuiz /> : <Navigate to="/auth" />}
          />
          <Route
            path="/answerQuiz"
            element={auth ? <AnswerQuiz /> : <Navigate to="/auth" />}
          />
          <Route
            path="/results"
            element={auth ? <Result /> : <Navigate to="/auth" />}
          />
          <Route
            path="/dashboard"
            element={auth ? <Dashboard /> : <Navigate to="/auth" />}
          />
          <Route
            path="/jambform"
            element={auth ? <JambForm /> : <Navigate to="/auth" />}
          />
          <Route
            path="/verifyemail"
            element={auth ? <VerifyEmail /> : <Navigate to="/auth" />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
