const router = require("express").Router();
const Course = require("../models").courseModel;
const courseValidation = require("../validation").courseValidation;

router.use((req, res, next) => {
  console.log("A request is coming into api...");
  next();
});

router.get("/", async (req, res) => {
  try {
    let course = await Course.find({}).populate("instructor", [
      "username",
      "email",
    ]);
    res.status(200).send(course);
  } catch (err) {
    res.status(500).send("Cannot not get Courses");
  }
});

router.get("/instructor/:_instructor_id", (req, res) => {
  let { _instructor_id } = req.params;
  Course.find({ instructor: _instructor_id })
    .populate("instructor", ["username", "email"])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send("Cannot get course data.");
    });
});

//LT 549
router.get("/findByName/:name", async (req, res) => {
  let { name } = req.params;
  try {
    let findCourse = await Course.find({ title: name }).populate("instructor", [
      "username",
      "email",
    ]);
    console.log(findCourse);
    res.status(200).send(findCourse);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Wilson ver.
// router.get("/findByName/:name", (req, res) => {
//   let { name } = req.params;
//   Course.find({ title: name })
//     .populate("instructor", ["username", "email"])
//     .then((course) => {
//       console.log(course);
//       res.status(200).send(course);
//     })
//     .catch((err) => {
//       res.status(500).send(err);
//     });
// });

router.get("/student/:_student_id", async (req, res) => {
  let { _student_id } = req.params;
  try {
    // 要搵個Course 入邊嘅students array，可以用stidents(props): _student_id(value) 直接搵到相似嘅
    let findCourse = await Course.find({ students: _student_id }).populate(
      "instructor",
      ["username", "email"]
    );
    res.status(200).send(findCourse);
  } catch (err) {
    console.log(err);
  }
});

router.patch("/student/:course_id", async (req, res) => {
  let { course_id } = req.params;
  let { user_id } = req.body;
  try {
    let update = await Course.findOneAndUpdate(
      { _id: course_id },
      { $pull: { students: user_id } }
    );
    // console.log(update);
    // console.log("Updated");
    res.status(200).send(update);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:_id", async (req, res) => {
  // console.log(req.params);
  let { _id } = req.params;
  try {
    let course = await Course.findOne({ _id }).populate("instructor", [
      "email",
    ]);
    res.status(200).send(course);
  } catch (err) {
    res.status(401).send(err);
  }
});

router.post("/", async (req, res) => {
  //validate the inputs before making a new course
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { title, description, price } = req.body;
  console.log(req.user.isStudent());
  console.log(req.user.isInstructor());
  if (req.user.isStudent()) {
    return res.status(400).send("Only instructor can post a new course.");
  }

  let newCourse = new Course({
    title,
    description,
    price,
    instructor: req.user._id,
  });

  try {
    await newCourse.save();
    res.status(200).send("New course has been saved.");
  } catch (err) {
    res.status(400).send("cannot save course.");
    console.log(err);
  }
});

router.post("/enroll/:_id", async (req, res) => {
  let { _id } = req.params;
  // req.body 係唔會係postman 用到，只會係axios set 果陣用到…
  let { user_id } = req.body;
  // console.log(req.body);
  // console.log(user_id);
  // console.log(_id);
  try {
    let course = await Course.findOne({ _id });
    console.log(course);
    course.students.push(user_id);
    await course.save();
    res.send("Done Erollment");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.patch("/:_id", async (req, res) => {
  //validate the inputs before making a new course
  const { error } = courseValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "Course not found.",
    });
  }
  //Check 個course id 係咪同一個人
  if (course.instructor === undefined) {
    res.status(403);
    return res.json({
      muccess: false,
      message: "There is no course instructor here.",
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    try {
      await Course.findOneAndUpdate({ _id }, req.body, {
        new: true,
        runValidators: true,
      });
      res.send("Course updated.");
    } catch (err) {
      res.send({ success: false, message: err });
    }
  } else {
    res.status(403);
    return res.json({
      muccess: false,
      message:
        "Only the instructor of this course or web admin can edit this course.",
    });
  }
});

router.delete("/:_id", async (req, res) => {
  let { _id } = req.params;
  let course = await Course.findOne({ _id });
  if (!course) {
    res.status(404);
    return res.json({
      success: false,
      message: "Course not found.",
    });
  }

  if (course.instructor === undefined) {
    res.status(403);
    return res.json({
      muccess: false,
      message: "There is no course instructor here.",
    });
  }

  if (course.instructor.equals(req.user._id) || req.user.isAdmin()) {
    try {
      await Course.deleteOne({ _id });
      res.send("Course deleted.");
    } catch (err) {
      res.send({ success: false, message: err });
    }
  } else {
    res.status(403);
    return res.json({
      muccess: false,
      message:
        "Only the instructor of this course or web admin can edit this course.",
    });
  }
});

module.exports = router;
