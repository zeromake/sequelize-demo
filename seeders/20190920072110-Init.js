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
    ])
    await queryInterface.bulkInsert('DesignTasks', [
      {
        "level": 0,
        "name": "需求1",
        "creator_id": 58308528,
        "tpl_total": 1,
        "designer_total": 1,
        "scenario": 32,
        "task_type": "82",
        "type_name": "任务类型test"
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
