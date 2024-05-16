const express = require('express');
const UserController = require('../controllers/UserController');
const UserValidator = require('../validator/UserValidator');

const router = express.Router();

const authController = new UserController();
const userValidator = new UserValidator();
router.post('/users', userValidator.userCreateValidator, authController.create);
router.get('/users/:id', userValidator.userCreateValidator, authController.create);
module.exports = router;
