import React from "react";
import { Switch, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Nav />
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/register" exact element={<Register />} />
        <Route path="/login" exact element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
