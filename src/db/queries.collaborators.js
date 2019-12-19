const Collaborator = require("./models").Collaborator;
const User = require("./models").User;
const Wiki = require("./models").Wiki;

module.exports = {

  createCollaborator(req, callback){
    console.log(req.params)
       return User.findOne({
         where: { email: req.body.email }
       })   
       .then((user) => {
         console.log(user.id)
         Collaborator.create({
           userId: user.id,
           wikiId: req.params.id
       })
       .then((collaborator) => {
         callback(null, collaborator);
       })
       .catch((err) => {
         callback(err);
     })
   })
},
remove(id, callback){
  //console.log(req.body);
  return Collaborator.findByPk(id)
  .then((collaborator) => {
    collaborator.destroy()
        .then((res) => {
          callback(null, collaborator)
        });
  })
  .catch((err) => {
    callback(err)
  })  
}

}

