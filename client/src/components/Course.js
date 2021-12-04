import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import CourseService from "../services/course.service";

const Course = (props) => {
  let { currentUser, setCurrentUser } = props;
  const history = useHistory();
  // 要拎到API data，就要用state 去拎，用null 係講就原先係拎唔到任何course data
  let [courseData, setCourseData] = useState(null);

  let deleteHandler = async (e) => {
    let deleteId = e.target.id;
    // console.log(e.target.id);
    await CourseService.deleteCourse(e.target.id);
    alert("Delete successfully");
    setCourseData(courseData.filter((items) => items._id !== deleteId));
    // .then((data) => {
    //   alert("Delete successfully");
    //   // 錯 --> 要改
    //   // courseData.filter((item) => item !== e.target.id);
    //   console.log(data);
    //   // history.push("/");
    //   let _id;
    //   if (currentUser) {
    //     _id = currentUser.user._id;
    //   } else {
    //     _id = "";
    //   }
    //   CourseService.get(_id)
    //     .then((data) => {
    //       console.log(data);
    //       setCourseData(data.data);
    //     })
    //     .catch((err) => {
    //       console.log(err);
    //     });
    // })
    // .catch((err) => {
    //   console.log(err);
    // });
  };

  let clickHandler = () => {
    history.push("/login");
  };

  useEffect(() => {
    console.log("Using effect.");
    let _id;
    if (currentUser) {
      _id = currentUser.user._id;
    } else {
      _id = "";
    }
    // console.log(_id);
    if (currentUser.user.role === "instructor") {
      CourseService.get(_id)
        .then((data) => {
          console.log(data);
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      CourseService.getEnroll(_id)
        .then((data) => {
          // console.log(data);
          setCourseData(data.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  console.log(courseData);

  // useEffect(() => {
  //   console.log("The course changed.");
  //   // history.push("/course");
  // }, [courseData]);
  //https://www.youtube.com/watch?v=0iNDB-2fg8A&ab_channel=WebDevJunkie

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
      {currentUser && courseData && courseData.length != 0 && (
        <div>
          <p>Data we got back from API.</p>
          {courseData.map((course) => (
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">{course.title}</h5>
                <p className="card-text">{course.description}</p>
                <p>Price: {course.price}</p>
                <p>Student: {course.students.length}</p>
                <a href="#" className="card-text" className="btn btn-primary">
                  See Course
                </a>
                <a
                  href="#"
                  className="card-text"
                  className="btn btn-danger"
                  id={course._id}
                  onClick={deleteHandler}
                  style={{ float: "right" }}
                >
                  Delete
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Course;
