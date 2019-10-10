'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sqldb = require('./sqldb');

var _sqldb2 = _interopRequireDefault(_sqldb);

var _environment = require('./config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _GygLog = require('./gyglog/GygLog');

var _GygLog2 = _interopRequireDefault(_GygLog);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express3 = require('./config/express');

var _express4 = _interopRequireDefault(_express3);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

var _seed = require('./config/seed');

var _seed2 = _interopRequireDefault(_seed);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Setup server
/**
 * Main application file
 */

var app = (0, _express2.default)();
var server = _http2.default.createServer(app);

(0, _express4.default)(app);
(0, _routes2.default)(app);

// Start server
function startServer() {
    app.angularFullstack = server.listen(_environment2.default.port, _environment2.default.ip, function () {
        let message = 'Express server listening on ' + _environment2.default.port + ', in ' + app.get('env') + ' mode';
        console.log(message);
        _GygLog2.default.logInit();
        _GygLog2.default.writeLog(_GygLog2.default.eLogLevel.debug, null, message);
    });
}

_sqldb2.default.sequelize.sync()
//.then(seedDatabaseIfNeeded)
.then(startServer).catch(err => {
    console.log('Server failed to start due to error: %s', err);
});

// Expose app
exports = module.exports = app;
//# sourceMappingURL=app.js.map
