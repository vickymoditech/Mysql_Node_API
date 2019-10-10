/**
 * Main application file
 */

import express from 'express';
import sqldb from './sqldb';
import config from './config/environment';
import GygLog from './gyglog/GygLog';
import http from 'http';

import expressConfig from './config/express';
import registerRoutes from './routes';
import seedDatabaseIfNeeded from './config/seed';


// Setup server
var app = express();
var server = http.createServer(app);

expressConfig(app);
registerRoutes(app);

// Start server
function startServer() {
    app.angularFullstack = server.listen(config.port, config.ip, function () {
        let message = 'Express server listening on ' + config.port + ', in ' + app.get('env') + ' mode';
        console.log(message);
           GygLog.logInit();
        GygLog.writeLog(GygLog.eLogLevel.debug, null, message);
    });
}

sqldb.sequelize.sync()
    //.then(seedDatabaseIfNeeded)
    .then(startServer)
    .catch(err => {
        console.log('Server failed to start due to error: %s', err);
    });

// Expose app
exports = module.exports = app;
