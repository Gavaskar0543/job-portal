const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const Student = require('../models/studentData');
const Interview = require('../models/interviewData');

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
     await Interview.deleteOne(interviewDate._id);
    
    if(req.xhr){
      return res.status(200).json({
        data:{
          interview_id : req.params.id
        },
        message:'interview deleted'
      })
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
        // Add more fields as needed
      ],
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
