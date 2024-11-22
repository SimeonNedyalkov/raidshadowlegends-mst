import Auth from "./components/auth";
import Home from "./components/Home";
import "./styles/base.css";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/auth" element={<Auth />}></Route>
      </Routes>
    </div>
  );
}

export default App;
