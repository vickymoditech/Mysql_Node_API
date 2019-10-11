import {getHomeDir} from "../../commonHelper/index";
/*eslint no-process-env:0*/

// Test specific configuration
// ===========================
module.exports = {
    // MongoDB connection options
    mongo: {
        useMongoClient: true,
        uri: 'mongodb://localhost/gygnode-test'
    },
    sequelize: {
        host: 'LocalHost',
        port: 3306,
        dbName: 'GYGTest',
        userName: 'root',
        password: 'TEJu6J5C1N3sZNhi',
        dialect: 'mysql'
    },
    port: '9001',
};
