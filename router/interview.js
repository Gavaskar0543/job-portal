const express = require('express');
const router = express.Router();
const interviewcontrol = require('../controller/interviewpage');
//schedule interview
router.post('/create',interviewcontrol.create);
//delete interview
router.get('/destroy/:id',interviewcontrol.destroy);
//download csv
router.get('/downloadCsv/:id',interviewcontrol.downloadCsv);
module.exports = router;