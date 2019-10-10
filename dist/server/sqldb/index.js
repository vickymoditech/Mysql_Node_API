'use strict';

var _environment = require('../config/environment');

var _environment2 = _interopRequireDefault(_environment);

var _sequelize = require('sequelize');

var _sequelize2 = _interopRequireDefault(_sequelize);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Sequelize initialization module
 */
var db = {
    Sequelize: _sequelize2.default,
    sequelize: new _sequelize2.default(_environment2.default.sequelize.dbName, _environment2.default.sequelize.userName, _environment2.default.sequelize.password, {
        host: _environment2.default.sequelize.host, dialect: _environment2.default.sequelize.dialect,
        port: _environment2.default.sequelize.port,
        logging: false,
        pool: {
            max: 5,
            min: 0,
            idle: 20000
        },
        operatorsAliases: false
    })
};

// Insert models below
db.Thing = db.sequelize.import('../api/model/thing.model');

module.exports = db;
//# sourceMappingURL=index.js.map
