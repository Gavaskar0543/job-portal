const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const Student = require('../models/studentData');
const Interview = require('../models/interviewData');
const StudentInterview = require('../models/studentInterviewData');

//scheduling interview
module.exports.newOne = async function(req,res){

  try{
   
    let interview = await Interview.create(req.body);
     if(req.xhr){
      return res.status(200).json({
        data:{
          interview : interview
        },
        message:'interview scheduled'
      })
     }
   res.redirect('back'); 
  }
  catch(error){
   console.log(error.message);
  }
  
   
}

//delete interview form database
module.exports.destroy = async function(req,res){
  try {
    const interviewDate = await Interview.findById(req.params.id);
    if (interviewDate) {
      await Interview.deleteOne(interviewDate._id);
      
      if (req.xhr) {
        return res.status(200).json({
          data: {
            interview_id: req.params.id
          },
          message: 'Interview deleted'
        });
      }
      return res.redirect('back');
    } else {
      return res.status(404).json({
        error: 'Interview not found'
      });
    }
        

  } catch (error) {
    console.log(error.message,'error in deleting interview schedule')
  }
   
}
//to download data from mongodb as csv


module.exports.downloadCsv = async function(req, res) {
  try {
    // Fetch the student details from MongoDB
    const student = await Student.findById(req.params.id);

    // Check if the student exists
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Prepare the CSV file
    const csvWriter = createCsvWriter({
      path: 'student.csv',
      header: [
        { id: 'name', title: 'Name' },
        { id: 'college', title: 'college' },
        { id: 'email', title: 'Email' },
        { id: 'status', title: 'Status' },
        { id: 'dsaFinalScore', title: 'DsaFinalScore' },
        { id:  'webDFinalScore', title: 'WebDFinalScore' },
        { id: 'reactFinalScore', title: 'ReactFinalScore' },
        //i want to show all interview dates in csv file
        {id:'interview',title:'Interview'}
        
        // Add more fields as needed
      ],
      // Add interview date fields to the header
    
    });
   

    // Write the student data to CSV
    await csvWriter.writeRecords([student]);

    // Set the response headers for downloading the CSV file
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="student.csv"');

    // Stream the CSV file to the response
    const fileStream = fs.createReadStream('student.csv');
    fileStream.pipe(res);

    // Delete the temporary CSV file after streaming
    fileStream.on('end', () => {
      fs.unlink('student.csv', (err) => {
        if (err) {
          console.error(err);
        }
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

//studentInterview schedule

module.exports.studentInterview = async function(req, res) {
  try {
    // Check if the interview already exists in the StudentInterview collection
    const alreadySchedule = await StudentInterview.findOne({ interview: req.body.interview });
    if (alreadySchedule) {
      alreadySchedule.student.push(req.body.student);
      await alreadySchedule.save();
     
      // Assuming Student is a valid model
      const student = await Student.findById(req.body.student);
      if (student) {
        student.interviews.push(req.body.interview);
        await student.save();
      }
      
    } else {
      const studentInterview = await StudentInterview.create({
        interview: req.body.interview,
        student: [req.body.student] // Pass an array of students
      });
      
     // Assuming Student is a valid model
     const student = await Student.findById(req.body.student);
     if (student) {
       student.interviews.push(req.body.interview);
       await student.save();
     }
     
    }
    return res.redirect('back');
  } catch (error) {
    console.log(error.message);
  }
}