const mongoose = require('mongoose');
const studentInterviewSchema = new mongoose.Schema({    

  //one interview many students
    interview:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Interview'
    },
    student:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Student'
    }],
   
    
},{
    timestamps:true
});

const StudentInterview = mongoose.model('StudentInterview',studentInterviewSchema);
module.exports = StudentInterview;