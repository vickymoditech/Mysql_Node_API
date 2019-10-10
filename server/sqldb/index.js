/**
 * Sequelize initialization module
 */
import config from '../config/environment';
import Sequelize from 'sequelize';

var db = {
    Sequelize,
    sequelize: new Sequelize(config.sequelize.dbName, config.sequelize.userName, config.sequelize.password,
        {
            host: config.sequelize.host, dialect: config.sequelize.dialect,
            port: config.sequelize.port,
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
db.User = db.sequelize.import('../api/model/user.model');
db.Post = db.sequelize.import('../api/model/post.model');
db.Comment = db.sequelize.import('../api/model/comment.model');

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Post.hasMany(db.Comment);
db.Comment.belongsTo(db.Post);

module.exports = db;
