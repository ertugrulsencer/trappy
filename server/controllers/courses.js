const Courses = require("../models/Courses");
const getCourseByKey = (req, res) => {
  const { course_key } = req.params;
  if (typeof course_key != "undefined") {
    Courses.find({ course_key })
      .then((course) => {
        if (course !== null) {
          res.status(200).json({ message: course });
        } else {
          res.status(404).json({ message: "Course not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({ message: "Bad request: course_key required" });
  }
};
const getCourse = (req, res) => {
  const { course_id } = req.params;
  if (typeof course_id != "undefined") {
    Courses.findById(course_id)
      .then((course) => {
        if (course !== null) {
          res.status(200).json({ message: course });
        } else {
          res.status(404).json({ message: "Course not found" });
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({ message: "Bad request: course_id required" });
  }
};
const getCourses = (req, res) => {
  Courses.find()
    .then((courses) => {
      if (courses.length) {
        res.status(200).json({ message: courses });
      } else {
        res.status(404).json({ message: "Courses not found" });
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: err });
    });
};
const addCourse = (req, res) => {
  const { course } = req.body;
  if (typeof course.course_key !== "undefined") {
    const insertCourse = new Courses({
      course_key: course.course_key,
      course_name: course.course_name,
    });
    insertCourse
      .save()
      .then((result) => {
        if (result) {
          console.log(result);
          res.status(201).json({ message: result });
        } else {
          console.error(result);
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({ message: "Bad request: course required" });
  }
};
const updateCourse = (req, res) => {
  const { course_id, course } = req.body;
  if (typeof course_id !== "undefined" || typeof course !== "undefined") {
    Courses.findByIdAndUpdate(course_id, course)
      .then((result) => {
        res.status(204).json({ message: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err });
      });
  } else {
    res
      .status(400)
      .json({ message: "Bad request: course_id and course Object required" });
  }
};
const deleteCourse = (req, res) => {
  const { course_id } = req.body;
  if (typeof course_id !== "undefined") {
    Courses.findByIdAndDelete(course_id)
      .then((result) => {
        res.status(204).json({ message: result });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ message: err });
      });
  } else {
    res.status(400).json({ message: "Bad request: course_id required" });
  }
};
module.exports = {
  getCourseByKey,
  getCourse,
  getCourses,
  addCourse,
  updateCourse,
  deleteCourse,
};
