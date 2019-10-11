import {getHomeDir} from "../../commonHelper/index";
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

    // Seed database on startup
    seedDB: true,
};
