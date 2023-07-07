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
    secret: 'mystrongsecret',
    morgan: {
        mode: 'dev',
        options: {stream: accessLogStream}
    }
    
}
module.exports = development;