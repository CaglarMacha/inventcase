const SuperDao = require('./SuperDao');
const models = require('../models');
const { processType } = require('../config/constant');
const BookTransaction = models.BookTransaction;
class BookTransactionDao extends SuperDao {
    constructor() {
        super(BookTransaction);
    }

    async isExists(userid, bookid) {
        return BookTransaction.count({ where: { bookid: bookid, processtype: processType.BORROW } }).then((count) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }
    async isExistsByCurrent(userid, bookid) {
        return BookTransaction.count({ where: {userid: userid, bookid: bookid, processtype: processType.BORROW } }).then((count) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }

    async createeTransaction(book, transaction) {
        return BookTransaction.create(book, { transaction });
    }
}

module.exports = BookTransactionDao;
