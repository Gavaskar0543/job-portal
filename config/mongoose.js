const mongoose = require('mongoose');
const env = require('./environment');
//mongoose.connect("mongodb+srv://gavaskar:V.gu2PSzC7cLWLa@cluster0.jivfwuj.mongodb.net/?retryWrites=true&w=majority");

//mongoose.connect(`mongodb://localhost/${env.dbUser}`);
mongoose.connect(`mongodb+srv://gavaskar:V.gu2PSzC7cLWLa@cluster0.jivfwuj.mongodb.net/?retryWrites=true&w=majority`);
const db = mongoose.connection;

db.on('error',console.error.bind(console,'Error in connecting Database'));

db.once('open',function(){
    console.log("Mongodb connected successfully!");
})

module.exports = db;