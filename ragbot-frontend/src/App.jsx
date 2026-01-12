import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Login from "./pages/Login";
import React from "react";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<HomePage />} path="/" />
        </Routes>
      </Router>
    </>
  );
}

export default App;
