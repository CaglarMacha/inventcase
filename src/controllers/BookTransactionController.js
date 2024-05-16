
const BookTransactionService = require('../service/BookTransactionService');
const BookService = require('../service/BookService');
const UserService = require('../service/UserService');
class BookController {
    constructor() {
        this.bookTransactionService = new BookTransactionService();
        this.bookService = new BookService();
        this.userService = new UserService();
    }

    create = async (req, res) => {
        try {
            const book = await this.bookTransactionService.createNewBorrowProcess(req.params.id, req.params.bookid);
            const { status } = book.response;
            const { message, data } = book.response;
            res.status(book.statusCode).send({ status, message, data });
        } catch (e) {
            console.Log(e);
            res.status(400).send(e);
        }
    };
    createReturn = async (req, res) => {
        try {
            const book = await this.bookTransactionService.createNewReturnProcess(req.params.id, req.params.bookid, req.body.score);
            //TODO:add book score update if have time
            const { status } = book.response;
            const { message, data } = book.response;
            res.status(book.statusCode).send({ status, message, data });
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    };

}

module.exports = BookController;
