const { processType } = require('../config/constant');
const BookTransactionDao = require('../dao/BookTransactionDao');
const responseHandler = require('../helpers/responseHandler');
const Book = require('../models/book');
const UserDao = require('../dao/UserDao');
class BookTransactionService {
    constructor() {
        this.bookTransactionDao = new BookTransactionDao();
        this.userDao = new UserDao();

    }

    /**
     * 
     * @param {Object} body
     * @returns {Object}
     */
    createNewBorrowProcess = async (id, bookid) => {
        try {
            if (!await this.userDao.isUserExists(id)) {
                return responseHandler.returnError(400, 'UserNotFound'); // TODO:localization add id have time
            }
            if (await this.bookTransactionDao.isExistsByCurrent(id,bookid)) {
                return responseHandler.returnError(400, 'Book already taken by you');
            }
            if (await this.bookTransactionDao.isExists(id,bookid)) {
                return responseHandler.returnError(400, 'Book already taken by another.');
            }
            let transactionData = await this.bookTransactionDao.create({ userid: id, bookid: bookid, processtype: processType.BORROW });
            var message ="";
            if (!transactionData) {
                message = 'Unexpected Server Error! Please Try again.';
                new Error(message)
            }
          
            transactionData = transactionData.toJSON();
            return responseHandler.returnSuccess(200, message, transactionData);
        } catch (e) {
            console.log(e);
            return responseHandler.returnError(400, 'Unexpected Server Error!');
        }
    };
    createNewReturnProcess = async (id, bookid,score) => {
        try {
            var isExists = await this.bookTransactionDao.isExistsByCurrent(id,bookid);
            if (!isExists) {
                return responseHandler.returnError(400, 'You cannot return a book you did not borrow.');
            }

            let transactionData = await this.bookTransactionDao.create({ userid: id, bookid: bookid, processtype: processType.RETURN, score: score });
            let existingTransactionData = await this.bookTransactionDao.updateWhere({ is_deleted: true }, { userid: id, bookid: bookid, processtype: processType.BORROW, is_deleted: false || null })
            var message ="";
            if (!transactionData) {
                message = 'Unexpected Server Error! Please Try again.';
                new Error(message)
            }
          
            transactionData = transactionData.toJSON();
            return responseHandler.returnSuccess(200, message, transactionData);
        } catch (e) {
            console.log(e);
            return responseHandler.returnError(400, 'Unexpected Server Error!');
        }
    };
    gettransactionsById = async (id) => {
        try {
            const message = '';
            var book = await this.bookTransactionDao.findAllByWhere({ userid: parseInt(id)});
            return responseHandler.returnSuccess(200, message, book);
        } catch (error) {
            console.log(error);
        }

    };
}

module.exports = BookTransactionService;
