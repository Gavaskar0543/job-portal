const mongoose = require('mongoose');
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
},
{
    timestamps:true
});

const Student = mongoose.model('Student',studentSchema);

module.exports = Student;