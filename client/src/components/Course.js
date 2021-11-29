import React from "react";
import { useHistory } from "react-router-dom";

const Course = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();

  let clickHandler = () => {
    history.push("/login");
  };

  return (
    <div style={{ padding: "3rem" }}>
      {console.log(currentUser)}
      {!currentUser && (
        <div>
          <p>You must login first</p>
          <button onClick={clickHandler} className="btn btn-primary btn-lg">
            Login page
          </button>
        </div>
      )}
      {currentUser && currentUser.user.role === "instructor" && (
        <div>
          <h1>Welcome to instructor page</h1>
        </div>
      )}
      {currentUser && currentUser.user.role === "student" && (
        <div>
          <h1>Welcome to Student page</h1>
        </div>
      )}
    </div>
  );
};

export default Course;
