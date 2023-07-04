const User = require('../models/userData');
//signup page
module.exports.signup = function(req,res){
    return res.render('signup')
}
//signin page
module.exports.signin = function(req,res){
    return res.render('signin')
}

//addon new employee
module.exports.create = async function(req,res){
  
    //check password and conforim password if mismatch
    if(req.body.password != req.body.confirmPassword){
        console.log('pswd /cpswd not match');
        return  res.redirect('back');
       
    }
    //check if User already exist 
    const user = await User.findOne({email : req.body.email});
    //not exists 
    if(!user){
        //create a new user
       const newUser =  await User.create(req.body);
        console.log("user Created Successfully",newUser);
     return res.redirect('/user/signin')
    }
    console.log('user already exists');
    return res.redirect('/user/signin');

}

//creating session
module.exports.createSession = function(req, res) {
   
   return res.redirect('/');
    
  };