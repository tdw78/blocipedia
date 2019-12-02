'use strict';
const faker = require("faker");

let users = [
  {
    name: "Joey Shmos",
    email: "jshmos@email.com",
    password: "abcdef",
    role: "standard",
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Johnny Does",
    email: "jdoes@email.com",
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
