const db = require('../models');
const { DesignTask } = db;

describe('update', async () => {

    it('update query was empty', async () => {
        // const update = async() => {
        const data = {
            "level": 0,
            "name": "需求1",
            "creator_id": 58308528,
            "tpl_total": 1,
            "designer_total": 1,
            "scenario": 32,
            "task_type": "82",
            "type_name": "任务类型test",
            "preview": undefined,
        }
        const book = await DesignTask.findOne();
        await book.update(data);
        // };
        // expect(update()).rejects.toThrow('111')
    });
});