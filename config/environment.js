const rfs = require('rotating-file-stream');
const fs = require('fs');
const path = require('path');

const logDirectory = path.join(__dirname, '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory
});

const development = {
    name: 'development',
    dbUser:'employee',
    secret: 'mystrongsecret',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
    
}

const production = {
    name: 'production',
    dbUser:process.env.DB_USER,
    dbPassword:process.env.DB_PASSWORD,
    secret: process.env.secret,
    morgan: {
        mode: 'combined',
        options: {stream: accessLogStream}
    }
    
}

module.exports = eval(process.env.NODE_ENV) == undefined ? development : eval(process.env.NODE_ENV);