'use strict';

const faker = require("faker");

let collaborators = [];

 for(let i = 1 ; i <= 10 ; i++){
   collaborators.push({
     userId: faker.random.number({min:1, max:10}),
     wikiId: faker.random.number({min:1, max:10}),
     createdAt: new Date(),
     updatedAt: new Date()
   });
 }

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.bulkInsert("Collaborators", collaborators, {});
  
  },

  down: (queryInterface, Sequelize) => {
    
    return queryInterface.bulkDelete("Collaborator", collaborators, {});

  }
};
