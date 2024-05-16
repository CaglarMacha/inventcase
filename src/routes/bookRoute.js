const express = require('express');
const BookController = require('../controllers/BookController');
const BookValidator = require('../validator/BookValidator');

const router = express.Router();

const bookController = new BookController();
const bookValidator = new BookValidator();
router.post('/books', bookValidator.bookCreateValidator, bookController.create);
router.get('/books', bookController.getAllBooks);
router.get('/books/:id', bookController.getBookById);
module.exports = router;
