import logo from "./logo.svg";
import "./App.css";
import Login from "./Login/Login";
import Form from "./Form/Form";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Result from "./Result/Result";

function App() {
  return (
    <div style={{ fontFamily: "'Varela Round', sans-serif" }}>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/form" element={<Form />} />
            <Route path="/result" element={<Result />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
