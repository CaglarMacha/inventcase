
const UserService = require('../service/UserService');
const BookService = require('../service/BookService');
const BookTransactionService = require('../service/BookTransactionService');
const User = require('../models/user');
const { processType } = require('../config/constant');
class UserController {
    constructor() {
        this.userService = new UserService();
        this.bookService = new BookService();
        this.bookTransactionService = new BookTransactionService();
    }

    create = async (req, res) => {
        try {
            const user = await this.userService.createUser(req.body);
            const { status } = user.response;
            // if (user.response.status) {
            //     tokens = await this.tokenService.generateAuthTokens(user.response.data);
            // }

            const { message, data } = user.response;
            res.status(user.statusCode).send({ status, message, data });
        } catch (e) {
            console.Log(e);
            res.status(400).send(e);
        }
    };
    getUserWithNavigationProperties = async (req, res) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            const transaction = await this.bookTransactionService.gettransactionsById(req.params.id);
            res.send(user); // if have enough time add like DTO and get only id and name
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }


    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getUsers();
            const result = users.map(y => [{ id: y.id, name: y.name }]) 
            res.send(result.reduce((acc, val) => acc.concat(val), [])); 
        } catch (e) { // TODO: if have enough time add class like DTO and get only id and name
            console.log(e);
            res.status(400).send(e); //
        }
    }
    getUserById = async (req, res) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            const transaction = await this.bookTransactionService.gettransactionsById(req.params.id);
            var past = transaction?.response?.data?.
                filter(x => x.processtype === processType.RETURN)
                .map(y => [{ id: y.bookid, score: y.score }]);
            var present = transaction.response?.data?.
                filter(x => x.processtype === processType.BORROW).
                map(y => [{ id: y.bookid, score: y.score }]);
            var response = {
                id: user.id,
                name: user.name,
                books: {
                    past: past.reduce((acc, val) => acc.concat(val), []),
                    present: present.reduce((acc, val) => acc.concat(val), [])
                }
            } // TODO: if have enough time refactor here its not clean.
            res.send(response);
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    };
    createBorrowBook = async (req, res) => {
        try {
            const result = await this.bookService.getUsers();
        } catch (error) {
            
        }
    }
}

module.exports = UserController;
