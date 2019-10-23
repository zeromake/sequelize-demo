const db = require('../models');
const { Book, dialect } = db;

let error = '';
switch(dialect) {
    case 'sqlite':
        error = 'SQLITE_ERROR: near "WHERE": syntax error';
        break;
    case 'mysql':
        error = 'Query was empty';
        break;
}

describe('update', () => {
    it('update query was empty', async() => {
        const update = async() => {
            const book = await Book.findOne();
            book.set({
                name: undefined,
            });
            console.log(book.changed());
            await book.save();
        };

        await expect(update()).rejects.toThrow(error);
    });
});