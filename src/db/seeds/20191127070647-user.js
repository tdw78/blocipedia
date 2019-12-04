'use strict';
const faker = require("faker");

// let users = [
//     {
//       name: "Joe Shmos",
//       email: "shmos@email.com",
//       password: "abcdef",
//       role: "standard",
//       createdAt: new Date(),
//       updatedAt: new Date()
//    },
//    {
//       name: "John Does",
//       email: "does@email.com",
//       password: "123456",
//       role: "standard",
//       createdAt: new Date(),
//       updatedAt: new Date()
//    }
//  ];


let users = [];
let num = 0;

 for(let i = 1 ; i <= 8 ; i++){
   num = num + 1
   users.push({
     id: num,
     name: faker.hacker.noun(),
     email: faker.internet.email(),
     password: faker.internet.password(),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Users", users, {});
  
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete("Users", null, {});

  }
};
