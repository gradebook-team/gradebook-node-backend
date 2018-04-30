const request = require('request-promise');
const models = require('./schemas.js');

const Students = models.Students;
const UserKeys = models.UserKeys;

exports.authenticateApiKey = (req, res, next) => {
    var key = req.body.api_key;

    if (key == null) {
        res.status(401).json({
            "status": "failure",
            "error": "Invalid API key"
        });
        return;
    }

    var userHash = key.substring(0, 10);

    UserKeys.findOne({ userHash: userHash }, (err, userKey) => {
        if (err || userKey == null || !userKey.apiKeys.contains(key)) {
            res.status(401).json({
                "status": "failure",
                "error": "Invalid API key"
            });
            return;
        }
        next();
    });
};

exports.authenticateCookies = (req, res, next) => {
    var cookies = req.cookies;
    var username = cookies.username;
    var token = cookies.token;

    Students.findOne({ username: username }, (err, student) => {
        if (err || student == null || student.token != token) {
            res.status(401).json({
                "status": "failure",
                "error": "Invalid user/token"
            });
            return;
        }

        res.locals.username = username;
        res.locals.token = token;
        next();
    });
};

exports.authenticateCredentials = (req, res, next) => {
    var username = req.body.username;
    var password = req.body.password;
};
