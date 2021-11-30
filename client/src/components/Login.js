import React, { useState } from "react";
import { useHistory } from "react-router";
import AuthService from "../services/auth.service";
import { LoginData } from "../data/LoginData";

const Login = (props) => {
  // const navigate = useNavigate();
  const history = useHistory();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  let { currentUser, setCurrentUser } = props;

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const loginHandler = () => {
    AuthService.login(email, password)
      .then((response) => {
        // console.log(response);
        if (response.data.token) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        setCurrentUser(AuthService.getCurrentUser());
        history.push("/profile");
      })
      .catch((err) => {
        // console.log(err);
        // console.log(err.response);
        setMessage(err.response.data);
      });
  };

  const handler = [{ fn: handleChangeEmail }, { fn: handleChangePassword }];

  let newLoginData = LoginData.map((item, index) => {
    let newObject = Object.assign(handler[index], item);
    return newObject;
  });

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {message && (
          <div className="alert alert-danger" role="alert">
            {message}
          </div>
        )}
        {newLoginData.map((item, index) => (
          <>
            <label htmlFor={item.htmlFor}>{item.htmlFor}</label>
            <input
              type={item.type}
              className={item.classname}
              onChange={item.fn}
            />
            <br />
          </>
        ))}

        <div className="form-group">
          <button onClick={loginHandler} className="btn btn-primary btn-block">
            <span>Login</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
