
module.exports = (sequelize, DataTypes) => {
    const DesignTask = sequelize.define('DesignTask', {
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
        scenario: DataTypes.INTEGER,
        creator_id: DataTypes.INTEGER,
        status: DataTypes.TINYINT(4),
        level: DataTypes.INTEGER,
        preview: {
            type: DataTypes.STRING,
            defaultValue: ''
        }
    });
    return DesignTask;
};