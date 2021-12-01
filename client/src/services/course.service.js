import axios from "axios";
const API_URL = "http://localhost:8000/api/courses";

class CourseService {
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

  // enroll course
  getEnroll(_id){
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }

    return axios.get(API_URL + "/student" + _id. {
      
    })

  }

  // get course
  get(_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    // console.log();
    return axios.get(API_URL + "/instructor/" + _id, {
      headers: { Authorization: token },
    });
  }
}

export default new CourseService();
