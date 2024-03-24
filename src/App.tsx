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
import VerifyEmail from "./routes/VerifyEmail";
import JambExam from "./routes/JambExam";
import JambResult from "./routes/JambResult";
import JambDashboard from "./routes/JambDashboard";

function App() {
  const { isAuthenticated } = useAuthContext();
  const { state: auth, isEmailVerified } = isAuthenticated;

  // const requireAuthAndEmailVerification = (component) => {
  //   if (!auth) return <Navigate to="/auth" />;
  //   if (!isEmailVerified) return <Navigate to="/verifyemail" />;
  //   return component;
  // };
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
          <Route
            path="/"
            element={
              auth && !isEmailVerified ? (
                <VerifyEmail />
              ) : (
                <Home />
              )
            }
          />
          <Route path="/how" element={<How />} />
          <Route path="/about" element={<About />} />
          <Route
            path="/auth"
            element={
              !auth ? (
                <Auth />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <Navigate to="/" />
              )
            }
          />
          <Route
            path="/quiz"
            element={
              !auth ? (
                <Navigate to="/auth" />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <GetQuiz />
              )
            }
          />
          <Route
            path="/answerQuiz"
            element={
              !auth ? (
                <Navigate to="/auth" />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <AnswerQuiz />
              )
            }
          />
          <Route
            path="/results"
            element={
              !auth ? (
                <Navigate to="/auth" />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <Result />
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              !auth ? (
                <Navigate to="/auth" />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <Dashboard />
              )
            }
          />
          <Route
            path="/jambform"
            element={
              !auth ? (
                <Navigate to="/auth" />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <JambForm />
              )
            }
          />
          <Route
            path="/jambexam"
            element={
              !auth ? (
                <Navigate to="/auth" />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <JambExam />
              )
            }
          />
          <Route
            path="/Jambresult"
            element={
              !auth ? (
                <Navigate to="/auth" />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <JambResult />
              )
            }
          />
          <Route
            path="/jambdashboard"
            element={
              !auth ? (
                <Navigate to="/auth" />
              ) : !isEmailVerified ? (
                <Navigate to="/verifyemail" />
              ) : (
                <JambDashboard />
              )
            }
          />
          <Route
            path="/verifyemail"
            element={
              auth && !isEmailVerified ? (
                <VerifyEmail />
              ) : (
                <Navigate to="/auth" />
              )
            }
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
