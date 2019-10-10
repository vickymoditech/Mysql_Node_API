/* jshint indent: 2 */

module.exports = function (sequelize, DataTypes) {
    return sequelize.define('post', {
        id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        user_id: {
            type: DataTypes.INTEGER(11),
            allowNull: false,
            references: {
                model: 'user',
                key: 'id'
            }
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }, {
        tableName: 'post',
        underscored: true,
        timestamps: false,
    });
};
