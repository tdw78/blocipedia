'use strict';
const faker = require("faker");

let users = [
    {
      name: "Joe Shmos",
      email: "shmos@email.com",
      password: "abcdef",
      role: "standard",
      createdAt: new Date(),
      updatedAt: new Date()
   },
   {
      name: "John Does",
      email: "does@email.com",
      password: "123456",
      role: "standard",
      createdAt: new Date(),
      updatedAt: new Date()
   }
 ];


module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Users", users, {});
  
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete("Users", null, {});

  }
};
