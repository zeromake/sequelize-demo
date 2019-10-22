const db = require('../models');
const { Book } = db;

describe('update', async() => {

    it('update query was empty', async() => {
        // const update = async() => {
            const book = await Book.findOne();
            // book.set({
            //     name: undefined,
            // });
            await book.update({
                id: undefined,
                name: 'test',
            });
        // };
        // expect(update()).rejects.toThrow('111')
    });
});