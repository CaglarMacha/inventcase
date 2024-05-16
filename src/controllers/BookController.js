
const BookService = require('../service/BookService');

class BookController {
    constructor() {
        this.bookService = new BookService();
    }

    create = async (req, res) => {
        try {
            const book = await this.bookService.createBook(req.body);
            const { status } = book.response;
            const { message, data } = book.response;
            res.status(book.statusCode).send({ status, message, data });
        } catch (e) {
            console.Log(e);
            res.status(400).send(e);
        }
    };
    getAllBooks = async (req, res) => {
        try {
            const books = await this.bookService.getAllBook();
            const result = books.response.data.map(y => [{ id: y.id, name: y.name }]) 
            res.send(result.reduce((acc, val) => acc.concat(val), [])); 
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    };

    getBookById = async (req, res) => {
        try {
            const book = await this.bookService.getBookById(req.params.id);
            res.send({ id: book.id, name: book.name, score: book.score }); //TODO:convert class
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    };
}

module.exports = BookController;
