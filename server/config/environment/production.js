import {getHomeDir} from "../../commonHelper/index";
/*eslint no-process-env:0*/

// Production specific configuration
// =================================
module.exports = {
    // Server IP
    ip: process.env.OPENSHIFT_NODEJS_IP
    || process.env.ip
    || undefined,

    // Server port
    port: process.env.OPENSHIFT_NODEJS_PORT
    || process.env.PORT
    || 8080,

    sequelize: {
        host: 'LocalHost',
        port: 3306,
        dbName: 'GYGProd',
        userName: 'root',
        password: 'TEJu6J5C1N3sZNhi',
        dialect: 'mysql'
    },

    //GyG Logging Settings
    gygLogSettings: {
        //Log file settings to write log file
        logFile: {
            threshold: 'ON', //{ON | OFF} ->If set to OFF it stop log to write to file
            filePath: getHomeDir() + '/GYGAPI'
        },

        //Stackify logging settings
        stackify: {
            threshold: 'ON', //{ON | OFF} ->If set to OFF it stop upload log to stackify
            apiKey: '8Il1Gt1Gc1Ce2Rx1Ro1Vl0Uh0Ww7Wi9Fb3Om7Vj',
            env: 'dod-dev'
        }
    },

};
