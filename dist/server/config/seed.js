'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

exports.default = seedDatabaseIfNeeded;

var _sqldb = require('../sqldb');

var _sqldb2 = _interopRequireDefault(_sqldb);

var _environment = require('./environment/');

var _environment2 = _interopRequireDefault(_environment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

function seedDatabaseIfNeeded() {
    if (!_environment2.default.seedDB) {
        return _promise2.default.resolve();
    }

    let Thing = _sqldb2.default.Thing;

    let promises = [];

    let thingPromise = Thing.destroy({ where: {} }).then(() => Thing.bulkCreate([{
        name: 'Development Tools',
        info: 'Integration with popular tools such as Webpack, Babel, TypeScript, Karma, Mocha, ESLint, Protractor, ' + 'Pug, Stylus, Sass, and Less.'
    }, {
        name: 'Server and Client integration',
        info: 'Built with a powerful and fun stack: MongoDB, Express, Angular, and Node.'
    }, {
        name: 'Smart Build System',
        info: 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of ' + 'scripts and styles into your app.html'
    }, {
        name: 'Modular Structure',
        info: 'Best practice client and server structures allow for more code reusability and maximum scalability'
    }, {
        name: 'Optimized Build',
        info: 'Build process packs up your templates as a single JavaScript payload, minifies your ' + 'scripts/css/images, and rewrites asset names for caching.'
    }, {
        name: 'Deployment Ready',
        info: 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
    }])).then(() => console.log('finished populating things')).catch(err => console.log('error populating things', err));
    promises.push(thingPromise);

    return _promise2.default.all(promises);
}
//# sourceMappingURL=seed.js.map
