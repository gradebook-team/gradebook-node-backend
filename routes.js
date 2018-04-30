const controller = require('./controllers.js');
const middleware = require('./middleware.js');
const versionPrefix = '/api/v1';

module.exports = (app) => {
    // ping
    app.get(versionPrefix + '/ping', (req, res) => res.json('pong'));

    app.route(versionPrefix + '/cookies')
        .post(middleware.authenticateApiKey)
        .post(middleware.authenticateCredentials)
        .post(controller.fetchCookies);

    app.route(versionPrefix + '/grades')
        .post(middleware.authenticateApiKey)
        .post(middleware.authenticateCookies)
        .post(controller.fetchGrades);

}