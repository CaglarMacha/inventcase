const SuperDao = require('./SuperDao');
const models = require('../models');

const User = models.User;

class UserDao extends SuperDao {
    constructor() {
        super(User);
    }


    async isNameExists(name) {
        return User.count({ where: { name } }).then((count) => {
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
