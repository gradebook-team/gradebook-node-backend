const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getConnectionString = (dbName) => {
    const connOptions = {
        useMongoClient: true,
        user: 'admin',
        pass: process.env.gradebook_mongodb,
        dbName: dbName,
        ssl: true,
        replicaSet: 'RecordBookCluster0-shard-0',
        authSource: 'admin'
    }

    console.log('password used: ' + process.env.gradebook_mongodb);
    return mongoose.createConnection('mongodb://recordbookcluster0-shard-00-00-l24me.mongodb.net:27017,recordbookcluster0-shard-00-01-l24me.mongodb.net:27017,recordbookcluster0-shard-00-02-l24me.mongodb.net:27017', connOptions);
};



var usersConn = mongoose.createConnection(getConnectionString('users'));
var userKeysConn = mongoose.createConnection(getConnectionString('apiKeys'));

var StudentSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    classLinks: Object,
    quarterLinks: [String],
    settings: {
        theme: String,
        profilePicture: String,
        backgroundPicture: String, // no idea what this is supposed to be so im gonna roll with String
        assignmentColoring: String
    },
    initialized: Boolean,
    SynergyCookies: String,
    token: String
});

var UserKeySchema = new Schema({
    userHash: String,
    apiKeys: [String]
});

module.exports.Students = usersConn.model('Students', StudentSchema, 'userSecure');
module.exports.UserKeys = userKeysConn.model('UserKeys', UserKeySchema, 'userKeys');
