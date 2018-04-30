const request = require('request-promise');
const models = require('./schemas.js');
const axios = require('axios');
const JSSoup = require('jssoup').default;

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
    console.log('authenticating credentials');
    var username = req.body.username;
    var password = req.body.password;

    var loginPage = axios.get('https://wa-bsd405-psv.edupoint.com/Login_Student_PXP.aspx?regenerateSessionId=True').then((res) => {
        console.log('got login page');
        var soup = new JSSoup(res);
        var inputs = soup.findAll('input');

        var data = {};

        inputs.forEach((input, index) => {
            console.log(input);
        });
        next();
    });
};
