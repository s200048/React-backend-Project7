import React, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";

const Profile = (props) => {
  let { currentUser, setCurrentUser } = props;

  return (
    <div style={{ padding: "3rem" }}>
      {!currentUser && <div>You must login first</div>}
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
          </p>
        </div>
      )}
    </div>
  );
};

export default Profile;
