import React from "react";
import { Switch, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import Register from "./components/Register";

function App() {
  return (
    <div>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/register" exact component={Register} />

        <Route path="/login" exact component={Login} />
        <Route path="/profile" exact component={Profile} />
      </Switch>
    </div>
  );
}

export default App;
