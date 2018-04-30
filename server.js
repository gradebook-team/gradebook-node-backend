const https = require('https');
const http = require('http');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const bodyParser = require('body-parser');
const routes = require("./routes.js");
const port = 3000;

var httpsOptions = {
    key: fs.readFileSync('/etc/letsencrypt/live/grades.newportml.com/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/grades.newportml.com/fullchain.pem')
}

var app = express();

/*
mongoose.Promise = global.Promise;
mongoose.connect(' <MONGODB CONNECTION STRING> ', { useMongoClient: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'gradebook-node-backend Mongoose Connection Error: '));
db.once('open', () => {
    console.log('gradebook-node-backend connected to MongoDB');
});
*/

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));

routes(app);

/*
var httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(port, '127.0.0.1');
*/

app.listen(port, '127.0.0.1', () => {
    console.log('gradebook-node-backend is live on port ' + port);
});

