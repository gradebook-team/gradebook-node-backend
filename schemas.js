const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var usersConn = mongoose.createConnection();
var userKeysConn = mongoose.createConnection();

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
