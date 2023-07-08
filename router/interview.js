const express = require('express');
const router = express.Router();
const interviewcontrol = require('../controller/interviewpage');
//schedule interview
router.post('/newOne',interviewcontrol.newOne);
//delete interview
router.get('/destroy/:id',interviewcontrol.destroy);
//download csv
router.get('/downloadCsv/:id',interviewcontrol.downloadCsv);
//studentInterview
router.post('/studentInterview',interviewcontrol.studentInterview);
module.exports = router;