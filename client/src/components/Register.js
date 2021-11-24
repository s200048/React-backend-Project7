import React from "react";

const htmlInput = [
  { label: "username" },
  { type: "text" },
  { classname: "form-control" },
];

const labelName = ["username", "email", "password", "role"];

const num = [
  { title: "abc" },
  { title: "qwe" },
  { title: "asd" },
  { title: "zxc" },
];

const Register = () => {
  return (
    <div style={{ padding: "3rem" }} className="col-md-12">
      <div>
        {htmlInput.map((item, index) => (
          <div className="form-group">
            <label>{labelName[index]}</label>
            <input
              type={item.type}
              className={item.classname}
              name={labelName[index]}
            />
          </div>
        ))}

        {/* {num.map((item) => (
          <h1 style={{ color: "red" }}>{item.title}</h1>
        ))} */}

        <button className="btn btn-primary">
          <span>Register</span>
        </button>
      </div>
    </div>
  );
};

export default Register;
