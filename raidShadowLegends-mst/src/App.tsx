import Auth from "./components/auth";
import Home from "./components/Home";
import { db } from "./config/firebase";

import { Routes, Route } from "react-router-dom";
import "./styles/base.css";

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
