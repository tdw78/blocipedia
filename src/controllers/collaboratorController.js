const collaboratorQueries = require("../db/queries.collaborators");

module.exports = {

create(req, res, next){

  collaboratorQueries.createCollaborator(req, (err, collaborator) => {
    if(err){
      req.flash("error", err);
      console.log(err);
      res.redirect("/");
    } else {
      res.redirect(req.headers.referer);
    }
  });
},
destroy(req, res, next){
  collaboratorQueries.remove(req.params.id, (err, collaborator) => {
      if(err) {
        console.log(err);
        res.redirect(500, "/wikis");
      } else {
        console.log(req.params.wiki_id)
        res.redirect(303, `/wikis/${req.params.wiki_id}/edit`);
      }
  });
},

}
