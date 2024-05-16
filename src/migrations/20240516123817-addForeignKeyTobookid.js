'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('BookTransactions', {
      fields: ['bookid'],
      type: 'foreign key',
      name: 'fk_Posts_bookid_Users_id',
      references: { 
        table: 'Books',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('Posts', 'fk_Posts_bookid_Users_id');
  }
};