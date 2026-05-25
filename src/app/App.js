import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Dashboard from "./pages/dashboard/dashboard";
import SignIn from "./pages/sign-in/signIn";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/" element={<Navigate to="/sign-in" />} />
          <Route path="*" element={<Navigate to="/sign-in" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
