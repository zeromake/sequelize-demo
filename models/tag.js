'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tags = sequelize.define('tags', {
    name: DataTypes.STRING,
    book_id: DataTypes.INTEGER
  });
  Tags.associate = function(models) {
    // const { Book, Tag } = models;
    // Tag.belongsTo(Book);
  };
  return Tags;
};