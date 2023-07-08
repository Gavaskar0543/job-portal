const Student = require("../models/studentData");
const Interview = require("../models/interviewData");
const fs = require("fs");
const path = require("path");
module.exports.create = async function (req, res) {
  try {
    const user = await Student.findOne({ email: req.body.email }).exec();

    if (!user) {
      const newUser = await Student.create(req.body);
      console.log("user added successfully!", newUser);
      return res.redirect("/students");
    }
    console.log("user already exists", user);
    return res.redirect("back");
  } catch (err) {
    console.log("error in creating newStudent", err.message);
  }
};
//studentProfile
module.exports.studentProfile = async function (req, res) {
  const student = await Student.findById(req.params.id);
  //.sort('-createdAt' ); // Sort by createdAt in descending order

  return res.render("profile", {
    student: student,
  });
};
//remove student from database
module.exports.destroy = async function (req, res) {
  try {
    const student = await Student.findById(req.params.id);
    await Student.deleteOne(student._id);
    if (req.xhr) {
      return res.status(200).json({
        data: {
          student_id: req.params.id,
        },
        message: "student deleted",
      });
    }
    else{
        return res.status(404).json({
            message: "student not found",
            });
    }
  } catch (error) {
    console.log(error.message, "error in deleting student");
  }
};
//updat student

module.exports.update = async function (req, res) {
  try {
    const student = await Student.findById(req.params.id);
    Student.uploadedAvatar(req, res, function (err) {
      if (err) {
        console.log("*****Multer Error: ", err);
      }

      student.status = req.body.status;

      if (req.file) {
        console.log("req.file", req.file);
        console.log("req.file.filename", req.file.filename);

        if (
          student.avatar &&
          fs.existsSync(path.join(__dirname, "..", student.avatar))
        ) {
          fs.unlinkSync(path.join(__dirname, "..", student.avatar));
        }
        // this is saving the path of the uploaded file into the avatar field in the user
        student.avatar = Student.avatarPath + "/" + req.file.filename;
      }
      student.save();
      return res.redirect("back");
    });
  } catch (error) {
    console.log("Error in updating student:", error.message);
  }
};

//student result
module.exports.studentResult = async function (req, res) {
  try {
    // Sort by createdAt in descending order

    return res.render("result");
  } catch (error) {
    console.log(error.message, "error in getting student result");
  }
}
//student interview
module.exports.studentInterview = async function (req, res) { 
  try {
    // Sort by createdAt in descending order
     const interview = await Interview.find({});
     const student = await Student.find({});
    return res.render("assignInterview", {
      interview: interview,
      student: student,
    });
  } catch (error) {
    console.log(error.message, "error in getting student interview");
  }
}