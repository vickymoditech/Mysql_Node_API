'use strict';

var _index = require('../../commonHelper/index');

/*eslint no-process-env:0*/

// Development specific configuration
// ==================================
module.exports = {

    // Sequelize connection options
    sequelize: {
        host: 'LocalHost',
        port: 3306,
        dbName: 'GYGDev',
        userName: 'root',
        password: 'TEJu6J5C1N3sZNhi',
        dialect: 'mysql'
    },

    //GyG Logging Settings
    gygLogSettings: {
        //Log file settings to write log file
        logFile: {
            threshold: 'ON', //{ON | OFF} ->If set to OFF it stop log to write to file
            filePath: (0, _index.getHomeDir)() + '/GYGAPI'
        },

        //Stackify logging settings
        stackify: {
            threshold: 'ON', //{ON | OFF} ->If set to OFF it stop upload log to stackify
            apiKey: '8Il1Gt1Gc1Ce2Rx1Ro1Vl0Uh0Ww7Wi9Fb3Om7Vj',
            env: 'dod-dev'
        }
    },

    // Seed database on startup
    seedDB: true
};
//# sourceMappingURL=development.js.map
