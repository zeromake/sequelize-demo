const db = require('../models');
const { Book, Tag } = db;
const Op = db.Sequelize.Op;

describe('include', function() {
    it('include subQuery', async() => {
        const books = await Book.findAll({
            include: [
                {
                    model: Tag,
                    required: true,
                }
            ],
        });
        expect(books).toHaveLength(1);
        expect(books[0].get('Tags')).toHaveLength(2);
    });

    it('include not subQuery', async() => {
        const books = await Book.findAll({
            subQuery: false,
            include: [
                {
                    model: Tag,
                    required: true,
                }
            ],
        });
        expect(books).toHaveLength(1);
        expect(books[0].get('Tags')).toHaveLength(2);
    });

    it('include offset', async() => {
        const book = await Book.findOne({
            order: [
                ['id', 'DESC'],
            ],
            include: [
                {
                    model: Tag
                }
            ]
        });
        const tags = book.get('Tags');
        function query(offset = 0) {
            return Book.findAll({
                include: [
                    {
                        model: Tag,
                        required: true,
                        where: {
                            id: {
                                [Op.in]: tags.map(i => i.get('id'))
                            },
                        }
                    }
                ],
                offset,
                limit: 1,
                subQuery: false,
                order: [
                    [Tag, 'id', 'DESC']
                ]
            });
        }
        let books = await query();
        expect(books).toHaveLength(1);
        expect(books[0].get('Tags')).toHaveLength(1);
        const id = books[0].get('id');
        books = await query(1);
        expect(books).toHaveLength(1);
        expect(books[0].get('id')).toEqual(id);
        expect(books[0].get('Tags')).toHaveLength(1);
    });

    it('include offset group', async() => {
        const book = await Book.findOne({
            order: [
                ['id', 'DESC'],
            ],
            include: [
                {
                    model: Tag
                }
            ]
        });
        function query(offset = 0) {
            return Book.findAll({
                include: [
                    {
                        model: Tag,
                        required: true,
                    }
                ],
                offset,
                limit: 1,
                subQuery: false,
                order: [
                    [Tag, 'id', 'DESC']
                ],
                group: 'Book.id',
            });
        }
        let books = await query();
        expect(books).toHaveLength(1);
        expect(books[0].get('Tags')).toHaveLength(1);
        books = await query(1);
        expect(books).toHaveLength(0);
    });
});