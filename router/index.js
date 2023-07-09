const express = require('express');
const router = express.Router();
const studentControl = require('../controller/studentpage');
const homecontrol = require('../controller/Homepage');
const passport = require('passport');
router.get('/',homecontrol.home);

//User
router.use('/user',require('./user'));
//students
router.get('/students',passport.checkAuthentication,homecontrol.students);
//students 
router.use('/std',require('./student'));
//interview page
router.get('/interview',passport.checkAuthentication,homecontrol.interview);
//job page
router.get('/jobs',passport.checkAuthentication,homecontrol.job);
//interview routes
router.use('/inter',require('./interview'));
//upload data
router.post('/uploads/:id',studentControl.update);
module.exports = router;