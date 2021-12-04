import axios from "axios";
const API_URL = "http://localhost:8000/api/courses";

class CourseService {
  // get all course for student
  getCourse() {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL, {
      headers: { Authorization: token },
    });
  }

  //Post course
  post(title, description, price) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // console.log(token);
    // 要post 到 server 嘅 course-route到，就要用axios.post，第1個係URL，之後就係要post 嘅嘢，最後係將個token 放入第3個params
    return axios.post(
      API_URL,
      { title, description, price },
      {
        //要將token 放入 header 呢個property到 (axios config?)
        headers: {
          Authorization: token,
        },
      }
    );
  }

  // get enroll course
  getEnroll(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/student/" + _id, {
      headers: {
        Authorization: token,
      },
    });
  }

  getCourseByName(name) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    // console.log(token);
    return axios.get(API_URL + "/findByName/" + name, {
      // headers 一定要加(s) ，唔係會出現unauthorize
      headers: {
        Authorization: token,
      },
    });
  }

  // get course
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }

  enroll(course_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.post(
      API_URL + "/enroll/" + course_id,
      { user_id },
      {
        headers: { Authorization: token },
      }
    );
  }

  cancelEnroll(course_id, user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.patch(
      API_URL + "/student/" + course_id,
      { user_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  deleteCourse(course_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.delete(API_URL + "/" + course_id, {
      headers: { Authorization: token },
    });
  }
}

export default new CourseService();
