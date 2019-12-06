'use strict';
module.exports = (sequelize, DataTypes) => {
  var Wiki = sequelize.define('Wiki', {
    title: {
     type: DataTypes.STRING,
     allowNull: false
    },
    body: {
     type: DataTypes.STRING,
     allowNull: false
    },
    private: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Wiki.associate = function(models) {
    Wiki.belongsTo(models.User, {
         foreignKey: "userId",
         onDelete: "CASCADE"
    });
    Wiki.addScope("privateWikis", (userId) => {
      return {
        where: { userId: userId, private: true},
        limit: 10,
        order: [["createdAt", "DESC"]]
      };
    });
  };
  
  return Wiki;
};