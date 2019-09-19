'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
    bookId: DataTypes.INTEGER
  }, {});
  Tag.associate = function(models) {
    // const { Book, Tag } = models;
    // Tag.belongsTo(Book);
  };
  return Tag;
};