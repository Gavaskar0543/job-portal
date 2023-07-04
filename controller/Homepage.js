const Student = require('../models/studentData');
const Interview = require('../models/interviewData');
module.exports.home = function(req,res){
    return res.render('home',{
        greet : "welcome"
    })
}
//student
module.exports.students = async function(req,res){
    const students = await Student.find();
    return res.render('student',{
        student : students
    });
}

//newstudent
module.exports.addnewS = function(req,res){
    return res.render('addnewStudent');
}

//interview
module.exports.interview = async function(req,res){
    const interview = await Interview.find();
    return res.render('interview',{
        inter : interview
    });
}
//job
module.exports.job =  function(req,res){
    
    return res.render('jobs');
}