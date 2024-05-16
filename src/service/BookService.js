const BookDao = require('../dao/BookDao');
const responseHandler = require('../helpers/responseHandler');
const { userConstant } = require('../config/constant');

class BookService {
    constructor() {
        this.userDao = new BookDao();
    }

    /**
     * Create a user
     * @param {Object} userBody
     * @returns {Object}
     */
    createUser = async (userBody) => {
        try {
            if (await this.userDao.isNameExists(userBody.name)) {
                return responseHandler.returnError(400, 'Name already taken');
            }
            userBody.status = userConstant.STATUS_ACTIVE;

            let userData = await this.userDao.create(userBody);
            var message ="";
            if (!userData) {
                message = 'Failed! Please Try again.';
                new Error(message)
            }
          
            userData = userData.toJSON();
            delete userData.password;

            return responseHandler.returnSuccess(200, message, userData);
        } catch (e) {
            console.log(e);
            return responseHandler.returnError(400, 'Something went wrong!');
        }
    };

    /**
     * Get user
     * @param {String} email
     * @returns {Object}
     */

    isEmailExists = async (email) => {
        const message = 'Email found!';
        if (!(await this.userDao.isNameExists(email))) {
            return responseHandler.returnError(400, 'Email not Found!!');
        }
        return responseHandler.returnSuccess(200, message);
    };

    getUserByUuid = async (uuid) => {
        return this.userDao.findOneByWhere({ uuid });
    };

    changePassword = async (data, uuid) => {
        let message = 'Login Successful';
        let statusCode = 200;
        let user = await this.userDao.findOneByWhere({ uuid });

        if (!user) {
            return responseHandler.returnError(400, 'User Not found!');
        }

        if (data.password !== data.confirm_password) {
            return responseHandler.returnError(
                400,
                'Confirm password not matched',
            );
        }

        const isPasswordValid = await bcrypt.compare(data.old_password, user.password);
        user = user.toJSON();
        delete user.password;
        if (!isPasswordValid) {
            statusCode = 400;
            message = 'Wrong old Password!';
            return responseHandler.returnError(statusCode, message);
        }
        const updateUser = await this.userDao.updateWhere(
            { password: bcrypt.hashSync(data.password, 8) },
            { uuid },
        );

        if (updateUser) {
            return responseHandler.returnSuccess(
                200,
                'Password updated Successfully!',
                {},
            );
        }

        return responseHandler.returnError(400, 'Password Update Failed!');
    };
}

module.exports = UserService;
