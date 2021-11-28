import React, { useState, useEffect } from "react";
import { Switch, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Profile from "./components/Profile";
import Register from "./components/Register";
import AuthService from "./services/auth.service";

function App() {
  //Save目前係邊個current user
  let [currentUser, setCurrentUser] = useState(AuthService.getCurrentUser());

  return (
    <div>
      <Nav currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Switch>
        <Route path="/" exact component={Home} />

        <Route path="/register" exact component={Register} />

        <Route
          path="/login"
          exact
          component={Login}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
        <Route
          path="/profile"
          exact
          component={Profile}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
        />
      </Switch>
    </div>
  );
}

export default App;
