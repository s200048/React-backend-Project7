import React from "react";
import { Link } from "react-router-dom";

const title = [
  { classname: "nav-link active", title: "Home", path: "/" },
  { classname: "nav-link", title: "Register", path: "/register" },
  { classname: "nav-link", title: "Login", path: "/login" },
  { classname: "nav-link", title: "Logout", path: "#" },
];

const Nav = () => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {title.map((item, index) => (
                <li className="nav-item">
                  <Link class={item.classname} to={item.path} key={index}>
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
