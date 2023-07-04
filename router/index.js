const express = require('express');
const router = express.Router();
const homecontrol = require('../controller/Homepage');
router.get('/',homecontrol.home);

//User
router.use('/user',require('./user'));
//students
router.get('/students',homecontrol.students);
//students 
router.use('/std',require('./student'));
//interview page
router.get('/interview',homecontrol.interview);
//job page
router.get('/jobs',homecontrol.job);
//interview routes
router.use('/inter',require('./interview'));
module.exports = router;