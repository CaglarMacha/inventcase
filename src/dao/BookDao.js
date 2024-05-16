const SuperDao = require('./SuperDao');
const models = require('../models');

const Book = models.Book;

class BookDao extends SuperDao {
    constructor() {
        super(Book);
    }

    async isNameExists(name) {
        return Book.count({ where: { name } }).then((count) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }

    async createWithTransaction(book, transaction) {
        return Book.create(book, { transaction });
    }
}

module.exports = BookDao;
