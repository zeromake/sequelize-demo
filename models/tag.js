'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('tag', {
    name: DataTypes.STRING,
    book_id: DataTypes.INTEGER
  });
  Tag.associate = function(models) {
    // const { Book, Tag } = models;
    // Tag.belongsTo(Book);
  };
  return Tag;
};