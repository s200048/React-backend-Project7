import React, { useState } from "react";
import { registerData } from "../data/RegisterData";
import AuthService from "../services/auth.service";

const Register = () => {
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [role, setRole] = useState("");

  const userHandler = (e) => {
    setUsername(e.target.value);
  };
  const emailHandler = (e) => {
    setEmail(e.target.value);
  };
  const passwordHandler = (e) => {
    setPassword(e.target.value);
  };
  const roleHandler = (e) => {
    setRole(e.target.value);
  };

  let handler = [
    { fn: userHandler },
    { fn: emailHandler },
    { fn: passwordHandler },
    { fn: roleHandler },
  ];

  let newregisterData = registerData.map((initValue, index) => {
    let newObject = Object.assign(handler[index], initValue);
    // newObject.fn = handler[index];
    // newObject.fn = handler;
    return newObject;
  });

  // let registerData = [
  //   {
  //     htmlFor: "username",
  //     type: "text",
  //     classname: "form-control",
  //     fn: userHandler,
  //   },
  //   {
  //     htmlFor: "email",
  //     type: "text",
  //     classname: "form-control",
  //     fn: emailHandler,
  //   },
  //   {
  //     htmlFor: "password",
  //     type: "password",
  //     classname: "form-control",
  //     fn: passwordHandler,
  //   },
  //   {
  //     htmlFor: "role",
  //     type: "text",
  //     classname: "form-control",
  //     fn: roleHandler,
  //   },
  // ];

  console.log(newregisterData);

  const registerHandler = () => {
    AuthService.register(username, email, password, role)
      .then(() => {
        window.alert("Registration succeeds.");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {newregisterData.map((item, index) => (
          <>
            <div className="form-group">
              <label htmlFor={item.htmlFor}>{item.htmlFor}</label>
              <input
                type={item.type}
                className={item.classname}
                name={item.htmlFor}
                key={index}
                onChange={item.fn}
              />
            </div>
            <br />
          </>
        ))}

        <br />
        <button onClick={registerHandler} className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
