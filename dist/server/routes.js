'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (app) {
    // Insert routes below
    app.use('/api/things', require('./api/routes/thing.routes'));

    // All undefined asset or api routes should return a 404
    app.route('/:url(api|auth|components|app|bower_components|assets)/*').get(_errors2.default[404]);

    // All other routes should redirect to the app.html
    app.route('/*').get((req, res) => {
        res.sendFile(_path2.default.resolve(`${app.get('appPath')}/app.html`));
    });
};

var _errors = require('./components/errors');

var _errors2 = _interopRequireDefault(_errors);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
//# sourceMappingURL=routes.js.map
