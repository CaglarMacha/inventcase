const SuperDao = require('./SuperDao');
const models = require('../models');

const Book = models.book;

class UserDao extends SuperDao {
    constructor() {
        super(User);
    }

    async isEmailExists(email) {
        return User.count({ where: { email } }).then((count) => {
            if (count != 0) {
                return true;
            }
            return false;
        });
    }

    async createWithTransaction(user, transaction) {
        return User.create(user, { transaction });
    }
}

module.exports = UserDao;
