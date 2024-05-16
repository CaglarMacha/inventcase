const express = require('express');
const UserController = require('../controllers/UserController');
const UserValidator = require('../validator/UserValidator');

const router = express.Router();

const userController = new UserController();
const userValidator = new UserValidator();
router.post('/users', userValidator.userCreateValidator, userController.create);
router.get('/users/:id', userValidator.userCreateValidator, userController.create);
router.get('/users', userController.getAllUsers);
module.exports = router;
