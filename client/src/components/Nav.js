import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

let navTitle = [
  {
    classname: "nav-link active",
    title: "Home",
    path: "/",
    beforelogin: true,
    afterlogin: true,
  },
  {
    classname: "nav-link",
    title: "Register",
    path: "/register",
    beforelogin: true,
  },
  { classname: "nav-link", title: "Login", path: "/login", beforelogin: true },

  {
    classname: "nav-link",
    title: "Course",
    path: "/course",
    afterlogin: true,
  },
  {
    classname: "nav-link",
    title: "Profile",
    path: "/profile",
    afterlogin: true,
  },
  { classname: "nav-link", title: "Logout", path: "#", afterlogin: true },
];

const Nav = (props) => {
  let { currentUser, setCurrentUser } = props;
  // console.log(setCurrentUser);
  const history = useHistory();

  const logouthandler = () => {
    AuthService.logout();
    alert("Logout successfully.");
    setCurrentUser(null);
    history.push("/");
  };

  // let newNavTilte = Object.assign(handler[0], navTitle[3]);
  navTitle[5]["fn"] = logouthandler;

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
              {!currentUser &&
                navTitle
                  .filter((item) => item.beforelogin === true)
                  .map((filterItem, index) => (
                    <li className="nav-item">
                      <Link
                        class={filterItem.classname}
                        to={filterItem.path}
                        key={index}
                        onClick={filterItem.fn}
                      >
                        {filterItem.title}
                      </Link>
                    </li>
                  ))}
              {currentUser &&
                navTitle
                  .filter((item) => item.afterlogin === true)
                  .map((filterItem, index) => (
                    <li className="nav-item">
                      <Link
                        class={filterItem.classname}
                        to={filterItem.path}
                        key={index}
                        onClick={filterItem.fn}
                      >
                        {filterItem.title}
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
