const express = require('express');
const router = express.Router();
const passport = require('passport');
const userControl = require('../controller/userpage');
//show signup
router.get('/signup',userControl.signup);
//show signin
router.get('/signin',userControl.signin);
//addign new employee 
router.post('/create',userControl.create);
//signin employee
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/user/signup'},
), userControl.createSession);

module.exports = router;