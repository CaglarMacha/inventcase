const BookDao = require('../dao/BookDao');
const responseHandler = require('../helpers/responseHandler');
const { userConstant } = require('../config/constant');

class BookService {
    constructor() {
        this.bookDao = new BookDao();
    }

    /**
     * 
     * @param {Object} body
     * @returns {Object}
     */
    createBook= async (body) => {
        try {
            if (await this.bookDao.isNameExists(body.name)) {
                return responseHandler.returnError(400, 'Name already taken');
            }
            body.status = userConstant.STATUS_ACTIVE;

            let bookData = await this.bookDao.create(body);
            var message ="";
            if (!bookData) {
                message = 'Failed! Please Try again.';
                new Error(message)
            }
          
            bookData = bookData.toJSON();
            delete bookData.password;

            return responseHandler.returnSuccess(200, message, bookData);
        } catch (e) {
            console.log(e);
            return responseHandler.returnError(400, 'Something went wrong!');
        }
    };

    getBookById = async (id) => {
        try {
            return this.bookDao.findOneByWhere({ id });
        } catch (error) {
            console.log(error);
        }

    };

    getAllBook = async () => {
        try {
            var message ="";
            var bookData =  await this.bookDao.findAll();
            return responseHandler.returnSuccess(200, message, bookData);
        } catch (error) {
            
        }
    }
    updateBookById = async(id,score) =>{
        try {
            let existingTransactionData = await this.bookDao.updateWhere({ score: score }, { id: id })
        } catch (error) {
            
        }
    }
}

module.exports = BookService;
