const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");
const markdown = require( "markdown" ).markdown;
const collaboratorQueries = require("../db/queries.collaborators.js");

module.exports = {

index(req, res, next) {
   wikiQueries.getAllWikis((err, wikis) => {
        
     if(err) {
       res.redirect(500, "static/index");
     } else {
       res.render("wikis/index", {wikis});
    }
  })
 },
 new(req, res, next){
  const authorized = new Authorizer(req.user).new();
   
    if(authorized){
       res.render("wikis/new");
   } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
   }
 },
 create(req, res, next){
   const authorized = new Authorizer(req.user).create();

   if(authorized) {
     let newWiki = {
       title: markdown.toHTML(req.body.title),
       body: markdown.toHTML(req.body.body),
       userId: req.user.id
    };

   wikiQueries.addWiki(newWiki, (err, wiki) => {
       if(err) {
         res.redirect(500, "wikis/new");
       } else {
         res.redirect(303, `/wikis/${wiki.id}`);
       }
   });
  } else {
    req.flash("notice", "You are not authorized to do that.");
    res.redirect("/wikis");
  }
 },
 show(req, res, next){
  wikiQueries.getWiki(req.params.id, (err, wiki) => {
    
     if(err || wiki == null){
       console.log(err);
      res.redirect(404, "/");
    } else {
      res.render("wikis/show", {wiki});
   }
 });
},
edit(req, res, next){
  
  wikiQueries.getWiki(req.params.id, (err, wiki, collaborators) => {
    if(err || wiki == null){
         res.redirect(404, "/");
      } else {
         res.render("wikis/edit", {wiki, collaborators});
     } 
  });
 },
 update(req, res, next){
    wikiQueries.updateWiki(req, req.body, (err, wiki) => {
         if(err || wiki == null){
            res.redirect(401, `/wikis/${req.params.id}/edit`);
         } else {
           res.redirect(303, `/wikis/${req.params.id}`);
         }
    })
 },
 destroy(req, res, next){
     wikiQueries.deleteWiki(req, (err, wiki) => {
         if(err) {
           res.redirect(err, `/wikis/${req.params.id}`);
         } else {
           res.redirect(303, "/wikis");
         }
     });
 },
 newPrivate(req, res, next){
   res.render("wikis/newPrivate");
 },
 privateWikis(req, res, next){
  wikiQueries.getAllWikis((err, wikis) => {
    if(err) {
      res.redirect(500, "static/index");
    } else {
     res.render("wikis/privatePage", {wikis});
    }
  })
},
createPrivate(req, res, next){
  const authorized = new Authorizer(req.user).create();

  if(authorized) {
    let newWiki = {
      title: markdown.toHTML(req.body.title),
      body: markdown.toHTML(req.body.body),
      userId: req.user.id
   };

  wikiQueries.addPrivateWiki(newWiki, (err, wiki) => {
      if(err) {
        res.redirect(500, "wikis/new");
      } else {
        res.redirect(303, `/wikis/${wiki.id}`);
      }
  });
 } else {
   req.flash("notice", "You are not authorized to do that.");
   res.redirect("/wikis");
 }
},
conversionPage(req, res, next){
  wikiQueries.getWiki(req.params.id, (err, wiki) => {
    
     if(err || wiki == null){
      res.redirect(404, "/");
    } else {
      res.render("wikis/conversion", {wiki});
   }
 });
},
convertWiki(req, res, next) {
  wikiQueries.convertedWiki(req.params.id, (err, wiki) => {
    if(err) {
      res.redirect(500, "wikis/new");
    } else {
      res.redirect(303, `/wikis/${wiki.id}`);
    }
  });
}


}