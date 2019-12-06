const User = require("./models").User;
const bcrypt = require("bcryptjs");
const Wiki = require("./models").Wiki;

module.exports = {
  
  createUser(newUser, callback){

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      role: newUser.role
    })
    .then((user) => {
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  getUser(id, callback){
  
    let result = {};
    
    User.findByPk(id)
    .then((user) => {
      if(!user) {
        callback(404);
      } else {
        result["user"] = user;

        Wiki.scope({method: ["privateWikis", id]}).findAll()
        .then((wikis) => {
          result["wikis"] = wikis;
          callback(null, result);
        })
        .catch((err) => {
          callback(err);
        })
      }
    })
  },
  upgrade(id, callback) {
    return User.findByPk(id)
      .then((user) => {
        user.update({ role: "Premium" });

        callback(null, user);
      })
      .catch((err) => {
        callback(err);
      });
  },
  downgrade(id, callback){
    return User.findByPk(id)
    .then((user) => {
      user.update({ role: "Standard" });
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    });
  }

}