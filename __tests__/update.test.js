const db = require('../models');
const { Book } = db;

describe('update', async () => {

    it('update query was empty', async () => {
        // const update = async() => {
        // const data = { level: 0,
        //     name: '需求1',
        //     creator_id: 58308528,
        //     tpl_total: 1,
        //     designer_total: 1,
        //     scenario: 32,
        //     industry: undefined,
        //     preview: undefined,
        //     task_type: '82',
        //     type_name: '任务类型test'
        // };
        const book = await Book.findOne();
        book.set({
            name: undefined,
        });
        console.log(book.changed());
        await book.save();
        // };
        // expect(update()).rejects.toThrow('111')
    });
});