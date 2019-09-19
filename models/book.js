'use strict';
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    name: DataTypes.STRING
  }, {});
  Book.associate = function(models) {
    const { Book, Tag } = models;
    Book.hasMany(Tag, {
      sourceKey: 'id',
      foreignKey: 'bookId',
    });
  };
  return Book;
};