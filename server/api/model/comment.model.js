/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('comment', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        post_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'post',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        commenter_username: {
            type: DataTypes.STRING(100),
            allowNull: false
        },
        commenter_email: {
            type: DataTypes.STRING(100),
            allowNull: true
        },
        status: {
            type: DataTypes.ENUM('approved', 'rejected', 'in review'),
            allowNull: false
        }
    }, {
        tableName: 'comment',
        underscored: true,
        timestamps: false,
    });
};
