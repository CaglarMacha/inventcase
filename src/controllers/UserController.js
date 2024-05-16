
const UserService = require('../service/UserService');

class UserController {
    constructor() {
        this.userService = new UserService();
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
}

module.exports = UserController;
