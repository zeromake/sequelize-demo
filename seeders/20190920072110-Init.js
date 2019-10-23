'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('books', [{
      name: 'Test',
    }], {});
    const [book] = await queryInterface.select(null, 'books', {
      attributes: ['id'],
      limit: 1,
      order: [
        ['id', 'DESC']
      ]
    });
    const id = book.id;
    await queryInterface.bulkInsert('tags', [
      {
        name: 'test',
        book_id: id,
      },
      {
        name: 'tag',
        book_id: id,
      }
    ]);
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tags', null, {});
    await queryInterface.bulkDelete('books', null, {});
  }
};
