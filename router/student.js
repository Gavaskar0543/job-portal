const express = require('express');
const router = express.Router();
const studentControl = require('../controller/studentpage');
const homecontrol = require('../controller/Homepage');
router.get('/',homecontrol.home);

//students 
router.get('/addnewstd',homecontrol.addnewS);
//student to database
router.post('/createNewStudent',studentControl.create);
//student profile page
router.get('/profile/:id',studentControl.studentProfile);
//remove student
router.get('/destroy/:id',studentControl.destroy);
//student result
router.get('/studentResult',studentControl.studentResult);
//student interview
router.get('/studentInterview',studentControl.studentInterview);
//update data
module.exports = router;