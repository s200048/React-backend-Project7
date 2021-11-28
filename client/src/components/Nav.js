import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

let navTitle = [
  { classname: "nav-link active", title: "Home", path: "/" },
  { classname: "nav-link", title: "Register", path: "/register" },
  { classname: "nav-link", title: "Login", path: "/login" },
  { classname: "nav-link", title: "Logout", path: "#" },
  { classname: "nav-link", title: "profile", path: "/profile" },
];

const Nav = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();

  const logouthandler = () => {
    AuthService.logout();
    alert("Logout successfully.");
    setCurrentUser(null);
    history.push("/");
  };

  // let newNavTilte = Object.assign(handler[0], navTitle[3]);
  navTitle[3]["fn"] = logouthandler;

  // let newFilter = navTitle;
  // newFilter.splice(1, 1);
  // console.log(newFilter);

  // console.log(navTitle);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              {navTitle.map((item, index) => (
                <li className="nav-item">
                  <Link
                    class={item.classname}
                    to={item.path}
                    key={index}
                    onClick={item.fn}
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
              {/* {currentUser &&
                navTitle.splice(1, 1).map((item, index) => (
                  <li className="nav-item">
                    <Link
                      class={item.classname}
                      to={item.path}
                      key={index}
                      onClick={item.fn}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))} */}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
