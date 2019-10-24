const db = require('../models');
const { Books, Tags } = db;
const Op = db.Sequelize.Op;
const fn = db.Sequelize.fn;


describe('include', function() {
    it('include subQuery', async() => {
        console.log('-------------subQuery-----------------')
        const books = await Books.findAll({
            include: [
                {
                    model: Tags,
                    required: true,
                }
            ],
            limit: 20
        });
        expect(books).toHaveLength(1);
        expect(books[0].get('tags')).toHaveLength(2);
    });

    it('include not subQuery', async() => {
        console.log('-------------close subQuery-----------------')
        const books = await Books.findAll({
            subQuery: false,
            include: [
                {
                    model: Tags,
                    required: true,
                }
            ],
            limit: 20
        });
        expect(books).toHaveLength(1);
        expect(books[0].get('tags')).toHaveLength(2);
    });

    it('include subQuery count', async() => {
        console.log('-------------subQuery count-----------------')
        const rawCount = await Books.count();
        const count = await Books.count({
            include: [
                {
                    model: Tags,
                    required: true,
                }
            ],
        });
        expect(rawCount).not.toEqual(count);
    });

    it('include not subQuery count', async() => {
        console.log('-------------close subQuery count-----------------')
        const rawCount = await Books.count();
        const count = await Books.count({
            subQuery: false,
            include: [
                {
                    model: Tags,
                    required: true,
                }
            ],
        });
        expect(rawCount).not.toEqual(count);
    });

    it('include subQuery count and distinct', async() => {
        console.log('-------------subQuery count distinct-----------------')
        const rawCount = await Books.count();
        const count = await Books.count({
            subQuery: false,
            distinct: true,
            col: 'id',
            include: [
                {
                    model: Tags,
                    required: true,
                }
            ],
        });
        expect(rawCount).toEqual(count);
    });


    it('include findItems', async() => {
        console.log('--------------findItems-----------------');
        const rawCount = await Books.count();
        const [_, count] = await Books.findItems({
            page_num: 1,
            page_size: 20
        }, {
            subQuery: false,
            include: [
                {
                    model: Tags,
                    required: true,
                }
            ],
            group: `${Books.name}.id`,
        });
        expect(rawCount).toEqual(count);
    });

    it('include not subQuery tags len', async() => {
        console.log('-------------close subQuery tags len-----------------')
        let book = await Books.findOne({
            include: [
                {
                    model: Tags,
                    required: true,
                }
            ]
        });
        let tags = book.get('tags');
        const rawLen = tags.length;
        // 2
        expect(rawLen).toEqual(2)

        book = await Books.findOne({
            subQuery: false,
            include: [
                {
                    model: Tags,
                    required: true,
                }
            ]
        });
        tags = book.get('tags');
        const len = tags.length;
        // 1
        expect(len).toEqual(1)
    })

    it('include offset', async() => {
        console.log('-------------subQuery offset-----------------')
        function query(offset = 0) {
            return Books.findAll({
                include: [
                    {
                        model: Tags,
                        required: true,
                    }
                ],
                offset,
                limit: 1,
                subQuery: false,
                order: [
                    [Tags, 'id', 'DESC']
                ]
            });
        }
        let books = await query();
        expect(books).toHaveLength(1);
        expect(books[0].get('tags')).toHaveLength(1);
        const id = books[0].get('id');
        books = await query(1);
        expect(books).toHaveLength(1);
        expect(books[0].get('id')).toEqual(id);
        expect(books[0].get('tags')).toHaveLength(1);
    });

    it('include offset group', async() => {
        console.log('-------------subQuery offset group-----------------')
        function query(offset = 0) {
            return Books.findAll({
                attributes: ['id'],
                include: [
                    {
                        attributes: [],
                        model: Tags,
                        required: true,
                    }
                ],
                offset,
                limit: 1,
                subQuery: false,
                // order: [
                //     [Tag, 'id', 'DESC']
                // ],
                group: `${Books.name}.id`,
            });
        }
        let books = await query();
        expect(books).toHaveLength(1);
        books = await query(1);
        expect(books).toHaveLength(0);
    });
});