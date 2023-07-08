const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/students/avatars');
const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    college:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    },
    dsaFinalScore:{
        type:String,
        required:true
    },
    webDFinalScore:{
        type:String,
        required:true
    },
    reactFinalScore:{
        type:String,
        required:true
    },
    avatar:{
        type:String
    },
    //one student many interviews store in array
    interviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'StudentInterview'
    }],
},
{
    timestamps:true
});

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now());
    }
  });


// static
studentSchema.statics.uploadedAvatar = multer({storage:  storage}).single('avatar');
studentSchema.statics.avatarPath = AVATAR_PATH;

const Student = mongoose.model('Student',studentSchema);
module.exports = Student;