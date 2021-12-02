import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();

  let clickHandler = () => {
    history.push("/login");
  };

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && (
        <div>
          <p>You must login first</p>
          <button onClick={clickHandler} className="btn btn-primary btn-lg">
            Login page
          </button>
        </div>
      )}
      {/* {console.log(currentUser)} */}
      {currentUser && (
        <div>
          <h1>In profile page</h1>
          <header className="jumbotron">
            <h3>
              <strong>{currentUser.user.username}</strong>
            </h3>
          </header>
          <p>
            <strong>
              <p>Token: {currentUser.token}</p>
            </strong>
            <strong>
              <p>ID: {currentUser.user._id}</p>
            </strong>
            <strong>
              <p>Email: {currentUser.user.email}</p>
            </strong>
            <strong>
              <p>Role: {currentUser.user.role}</p>
            </strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
