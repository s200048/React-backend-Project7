import React, { useState } from "react";
import { useNavigate } from "react-router";
import AuthService from "../services/auth.service";
import { LoginData } from "../data/LoginData";

const Login = () => {
  const navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        {LoginData.map((item, index) => (
          <>
            <label htmlFor={item.htmlFor}>{item.htmlFor}</label>
            <input type={item.type} className={item.classname} />
            <br />
          </>
        ))}

        <div className="form-group">
          <button className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
