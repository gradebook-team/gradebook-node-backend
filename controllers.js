const request = require('request-promise');

const models = require('./schemas.js');

const Students = models.Students;

exports.fetchCookies = (req, res) => {
    res.json({ "status": "placeholder" });
};

exports.fetchGrades = (req, res) => {

};
