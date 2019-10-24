const db = require('../models');
const { Books, dialect } = db;

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
        console.log('-------------update error-----------------')
        const update = async() => {
            const book = await Books.findOne();
            book.set({
                name: undefined,
            });
            console.log(book.changed());
            await book.save();
        };

        await expect(update()).rejects.toThrow(error);
    });

    it('update', async() => {
        console.log('-------------update-----------------')
        function filterObjectUndefined(obj) {
            const target = {};
            for(const key in obj) {
                if(obj[key] !== undefined) {
                    target[key] = obj[key];
                }
            }
            return target;
        }
        const update = async() => {
            const book = await Books.findOne();
            book.set(filterObjectUndefined({
                name: undefined,
            }));
            console.log(book.changed());
            await book.save();
        };

        await expect(update()).resolves.toBeUndefined();
    });
});