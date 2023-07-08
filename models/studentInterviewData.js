const mongoose = require('mongoose');
const studentInterviewSchema = new mongoose.Schema({    

    studentid:{
        type:String,
        required:true
    },
    interview:{
        type:String,
        required:true
    },
    
},{
    timestamps:true
});

const StudentInterview = mongoose.model('StudentInterview',studentInterviewSchema);
module.exports = StudentInterview;