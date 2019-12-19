'use strict';
module.exports = (sequelize, DataTypes) => {
  const Collaborator = sequelize.define('Collaborator', {

    wikiId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Collaborator.associate = function(models) {
    Collaborator.belongsTo(models.Wiki, {
        foreignKey: "wikiId",
        as: "wiki",
        onDelete: "CASCADE"
    });
  Collaborator.belongsTo(models.User, {
       foreignKey: "userId",
       as: "users",
       onDelete: "CASCADE"
    });
  Collaborator.addScope("collaborators", (wikiId) => {
      return {
        include: [{
            model: models.User,
            as: "users",
          }],
        where: { wikiId: wikiId },
        order: [["createdAt", "DESC"]]
      };
    });
    Collaborator.addScope("collaborations", (userId) => {
      return {
        include: [{
            model: models.Wiki,
            as: "wiki",
          }],
        where: { userId: userId },
        order: [["createdAt", "DESC"]]
      };
    });
  };
  return Collaborator;
};