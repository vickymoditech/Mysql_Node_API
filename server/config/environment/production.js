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
};
