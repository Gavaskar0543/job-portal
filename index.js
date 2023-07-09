const express = require('express');
const port = 8000;
const app =express();
const env = require('./config/environment');
const db = require('./config/mongoose');
const expressLayout = require('express-ejs-layouts');
const passport = require('passport');
const LocalStrategy = require('./config/passport-local-strategy');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');
const logger = require('morgan');
app.use(cookieParser());
//assets
app.use(express.static('./assets'));
//express layout
app.use(expressLayout);
//extract style
app.set('layout extractStyles',true);
//extract script
app.set('layout extractScripts',true);
//middlewae
app.use(express.urlencoded());
//view engine
app.set('view engine','ejs');
//seting view engine to access views
app.set('views','view');
//node sass middleware


//session storange in user device
app.use(session({
   name:'authemp',
   secret:env.secret,
   saveUninitialized:false,
   resave:false,
   cookie:{
    maxAge:(1000*60*100),
   },
    
   store: MongoStore.create({
    mongoUrl: "mongodb://127.0.0.1:27017",
    autoRemove: "disabled",
  }),

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
//path
const path = require('path');
//sass middleware

//logger
app.use(logger(env.morgan.mode,env.morgan.options));
//file upload
app.use('/uploads',express.static(__dirname + '/uploads')); 
app.use('/',require('./router'));
app.listen(port,(err) =>{
    if(err){
        console.log('error in running server',err);
        return;
    }
    console.log(`Express server up on port ${port}`);
})