const db = require('./models');
const Op = db.Sequelize.Op;

async function main() {
    const { Book, Tag } = db;
    const books = await Book.findAll({
        include: [
            {
                model: Tag,
                required: true,
                where: {
                    id: {
                        [Op.in]: [1, 2, 3]
                    },
                }
            }
        ],
        limit: 20,
        subQuery: false,
    });
    console.log(books);
}

main().then(() => {
    process.exit(0);
});
