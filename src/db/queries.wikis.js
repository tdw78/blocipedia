const Wiki = require("./models").Wiki;
const Authorizer = require("../policies/wiki");
module.exports = {

  getAllWikis(callback) {
     return Wiki.findAll()
     
     .then((wikis) => {
        callback(null, wikis);
     })
     .catch((err) => {
       callback(err);
     })
  },
  addWiki(newWiki, callback){
    return Wiki.create({
       title: newWiki.title,
       body: newWiki.body,
       userId: newWiki.userId
     })
     .then((wiki) => {
       callback(null, wiki);
     })
     .catch((err) => {
       callback(err);
     });
  },
  getWiki(id, callback) {
    
   return Wiki.findByPk(id)
     .then((wiki) => {
       callback(null, wiki);
     })
     .catch((err) => {
       callback(err);
     })
  },
  updateWiki(req, updatedWiki, callback){
     return Wiki.findByPk(req.params.id)
      .then((wiki) => {
        wiki.update(updatedWiki, {
          fields: Object.keys(updatedWiki)
        })
        .then(() => {
          callback(null, wiki);
      })
      .catch((err) => {
        callback(err);
      });
    });
  },
  deleteWiki(req, callback){
     return Wiki.findByPk(req.params.id)
     .then((wiki) => {

        wiki.destroy()
        .then((res) => {
          callback(null, wiki)
        });
     })
     .catch((err) => {
       callback(err);
     });
  },
  addPrivateWiki(newWiki, callback){ 
    return Wiki.create({
       title: newWiki.title,
       body: newWiki.body,
       userId: newWiki.userId,
       private: true
     })
     .then((wiki) => {
       callback(null, wiki);
     })
     .catch((err) => {
       callback(err);
     });
  },
  privateToPublic(id) {
    return Wiki.findAll()
      .then((wikis) => {
        wikis.forEach((wiki) => {
          if (wiki.userId == id && wiki.private == true) {
            wiki.update({ private: false })
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  },
  convertedWiki(id, callback) {
    return Wiki.findByPk(id)
      .then((wiki) => {
        if (!wiki.private) {
          wiki.update({ private: true })
            callback(null, wiki);
          } else if (wiki.private) {
            wiki.update({ private: false })
            callback(null, wiki);
          }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}