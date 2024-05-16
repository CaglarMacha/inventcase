'use strict';
const {
  Model
} = require('sequelize');

const User = require('./user');
module.exports = (sequelize, DataTypes) => {
  class BookTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      
    }
  }
  BookTransaction.init({
    bookid: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Books',
        },
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE'
    },
    userid: {
      type: DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users',
        },
        key: 'id',
      },
      allowNull: false,
      onDelete: 'CASCADE'
    },
    processtype: DataTypes.INTEGER,
    score: DataTypes.INTEGER,
    is_deleted: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'BookTransaction',
  });
  BookTransaction.belongsTo(User);
  return BookTransaction;
};