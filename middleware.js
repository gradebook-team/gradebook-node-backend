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

exports.authenticateCookie = (req, res, next) => {

};

exports.authenticateCredentials = (req, res, next) => {

};
