const UserDao = require('../dao/UserDao');
const responseHandler = require('../helpers/responseHandler');
const { userConstant } = require('../config/constant');

class UserService {
    constructor() {
        this.userDao = new UserDao();
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
}

module.exports = UserService;
