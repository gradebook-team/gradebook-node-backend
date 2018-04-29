const https = require('https');
const fs = require('fs');
const express = require('express');
const mongoose = require('mongoose');
const models = require('./schemas.js');
const bodyParser = require('body-parser');
const routes = require("./routes.js");
const port = 3000;

var httpsOptions = {
    key: fs.readFileSync(' <SSL KEY FILE> '),
    cert: fs.readFileSync(' <SSL CERT FILE> '),
    passphrase: ' <PASSWORD> '
}

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect(' <MONGODB CONNECTION STRING> ', { useMongoClient: true });

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'gradebook-node-backend Mongoose Connection Error: '));
db.once('open', () => {
    console.log('gradebook-node-backend connected to MongoDB');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
routes(app);

var httpsServer = https.createServer(httpsOptions, app);
httpsServer.listen(port);
console.log('gradebook-node-backend is live on port ' + port);
