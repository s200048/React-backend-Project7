import React from "react";
import { Link, useHistory } from "react-router-dom";
import AuthService from "../services/auth.service";

const Nav = (props) => {
  let { currentUser, setCurrentUser, navData } = props;
  // console.log(setCurrentUser);
  const history = useHistory();

  const logouthandler = () => {
    AuthService.logout();
    alert("Logout successfully.");
    setCurrentUser(null);
    history.push("/");
  };

  // let newNavTilte = Object.assign(handler[0], navTitle[3]);
  let i = 0;
  for (i = 0; i < navData.length; i++) {
    if (navData[i].title === "Logout") {
      navData[i]["fn"] = logouthandler;
      // console.log(navTitle[i]);
    }
  }

  //會變咗infinity loop
  // while (navTitle[i].afterlogin == true) {
  //   // navTitle[i]["fn"] = logouthandler;
  //   console.log(navTitle[i]);
  // }

  // Object.assign({ fn: logouthandler }, navTitle[3]);
  // navTitle[i]["fn"] = logouthandler;
  // navTitle[5]["fn"] = logouthandler;
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
                navData
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
                currentUser.user.role === "student" &&
                navData
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
              {currentUser &&
                currentUser.user.role === "instructor" &&
                navData
                  .filter(
                    (item) =>
                      item.afterlogin === true || item.isInstructor === true
                  )
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
