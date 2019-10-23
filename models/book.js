'use strict';
/**
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('book', {
    name: DataTypes.STRING
  });
  Book.associate = function(models) {
    const { Book, Tag } = models;
    Book.hasMany(Tag, {
      sourceKey: 'id',
      foreignKey: 'book_id',
    });
  };
  return Book;
};
