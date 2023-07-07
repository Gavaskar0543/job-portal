const Student = require('../models/studentData');
module.exports.create = async function(req,res){
   
    try{
        const user = await Student.findOne({email : req.body.email}).exec();

        if(!user){
            const newUser = await Student.create(req.body);
            console.log('user added successfully!',newUser);
            return res.redirect('/students');
        }
        console.log('user already exists',user);
        return res.redirect('back');
    }
    catch(err){
           console.log('error in creating newStudent',err.message);
    }
   
}
//studentProfile
module.exports.studentProfile = async function(req,res){
    const student = await Student.findById(req.params.id)
    //.sort('-createdAt' ); // Sort by createdAt in descending order

    return res.render('profile',{
        student:student
    });
}
//remove student from database
module.exports.destroy = async function(req,res){
    try {
    const student = await Student.findById(req.params.id);
     await Student.deleteOne(student._id);
    if(req.xhr){
        return res.status(200).json({
            data:{
                student_id : req.params.id
            },
            message:'student deleted'
        })
    }
        
    } catch (error) {
        console.log(error.message,'error in deleting student');
    }
}