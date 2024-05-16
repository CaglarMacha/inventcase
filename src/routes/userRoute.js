const express = require('express');
const UserController = require('../controllers/UserController');
const UserValidator = require('../validator/UserValidator');
const BookTransactionController = require('../controllers/BookTransactionController');
const router = express.Router();

const userController = new UserController();
const bookTransactionController = new BookTransactionController();
const userValidator = new UserValidator();
router.post('/users', userValidator.userCreateValidator, userController.create);
router.get('/users/:id', userController.getUserById);
router.get('/users', userController.getAllUsers);
router.post('/users/:id/borrow/:bookid', bookTransactionController.create);
router.post('/users/:id/return/:bookid', bookTransactionController.createReturn);
module.exports = router;
