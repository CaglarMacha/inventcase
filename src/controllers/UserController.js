
const UserService = require('../service/UserService');
const BookService = require('../service/BookService');
class UserController {
    constructor() {
        this.userService = new UserService();
        this.bookService = new BookService();
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
    getAllUsers = async (req, res) => {
        try {
            const users = await this.userService.getUsers();
             
            res.send(users); // if have enough time add like DTO and get only id and name
        } catch (e) {
            console.log(e);
            res.status(400).send(e);
        }
    }
    getUserById = async (req, res) => {
        try {
            const user = await this.userService.getUserById(req.params.id);
            res.send(user);
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
