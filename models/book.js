'use strict';
/**
 * @param {import('sequelize').Sequelize} sequelize
 */
module.exports = (sequelize, DataTypes) => {
  const Books = sequelize.define('books', {
    name: DataTypes.STRING
  });
  Books.associate = function(models) {
    const { Books, Tags } = models;
    Books.hasMany(Tags, {
      sourceKey: 'id',
      foreignKey: 'book_id',
    });
  };
  return Books;
};
