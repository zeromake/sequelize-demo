'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    const DataTypes = Sequelize;
    await queryInterface.createTable('DesignTasks', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        deleted: DataTypes.TINYINT,
        name: {
            type: DataTypes.STRING(45),
            defaultValue: ''
        },
        tpl_total: DataTypes.INTEGER,
        designer_total: DataTypes.INTEGER,
        price: DataTypes.DECIMAL(10, 2),
        task_type: {
            type: DataTypes.STRING(45),
        },
        type_name: {
            type: DataTypes.STRING(45),
        },
        creator_id: DataTypes.INTEGER,
        scenario: DataTypes.INTEGER,
        status: DataTypes.TINYINT(4),
        level: DataTypes.INTEGER,
        preview: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DesignTasks');
  }
};