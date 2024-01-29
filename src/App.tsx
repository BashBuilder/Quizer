import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Auth from "./routes/Auth";

function App() {
  return (
    <main className="mx-auto max-w-[92rem] ">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
