// models/Bookmark.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Bookmark = sequelize.define('bookmark_table', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        movie_id: {
            type: DataTypes.UUID,
            allowNull: false,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        last_modified: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: true,
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    }, {
        timestamps: false
    });

    Bookmark.associate = (models) => {
        Bookmark.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'CASCADE' });
        Bookmark.belongsTo(models.Movie, { foreignKey: 'movie_id', onDelete: 'CASCADE' });
    };

    return Bookmark;
}
