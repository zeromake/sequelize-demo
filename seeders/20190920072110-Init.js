'use strict';

module.exports = {
  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  async up(queryInterface, Sequelize) {
    const now = new Date();
    await queryInterface.bulkInsert('Books', [{
      name: 'Test',
      updatedAt: now,
      createdAt: now,
    }], {});
    const [book] = await queryInterface.select(null, 'Books', {
      attributes: ['id'],
      limit: 1,
      order: [
        ['id', 'DESC']
      ]
    });
    const id = book.id;
    await queryInterface.bulkInsert('Tags', [
      {
        name: 'test',
        bookId: id,
        updatedAt: now,
        createdAt: now,
      },
      {
        name: 'tag',
        bookId: id,
        updatedAt: now,
        createdAt: now,
      }
    ]);
  },

  /**
   * 
   * @param {import('sequelize').QueryInterface} queryInterface 
   * @param {import('sequelize')} Sequelize 
   */
  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
    await queryInterface.bulkDelete('Books', null, {});
  }
};
