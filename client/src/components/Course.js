import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const Course = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  // 要拎到API data，就要用state 去拎，用null 係講就原先係拎唔到任何course data
  let [courseData, setCourseData] = useState(null);
  useEffect(() => {
    console.log("Using effect.");
    let _id;
    if (currentUser) {
      _id = currentUser._id;
    } else {
      _id = "";
    }
    CourseService.get(_id)
      .then((data) => {
        setCourseData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let clickHandler = () => {
    history.push("/login");
  };

  return (
    <div style={{ padding: "3rem" }}>
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
