export let navData = [
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
  {
    classname: "nav-link",
    title: "Post Course",
    path: "/postCourse",
    isInstructor: true,
  },
  { classname: "nav-link", title: "Logout", path: "#", afterlogin: true },
];
