const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
const flash = require("express-flash");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

signup(req, res, next){
   
  res.render("users/sign_up");

 },
 create(req, res, next){
       let newUser = {
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         passwordConfirmation: req.body.passwordConfirmation
       };
       userQueries.createUser(newUser, (err, user) => {
         if(err){
           req.flash("error", err);
           console.log(err);
           res.redirect("/");

         } else {
  
           passport.authenticate("local")(req, res, () => {
             req.flash("notice", "You've successfully signed up!");
             res.redirect("/");
           });
           const msg = {
            to: newUser.email,
            from: 'test@example.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          };
          sgMail.send(msg);
         }
       });
     },
    signInForm(req, res, next){
        res.render("users/sign_in");
    },
    signIn(req, res, next) {
      passport.authenticate("local")(req, res, function () {
        if(!req.user){
          req.flash("notice", "Sign in failed. Please try again.")
          res.redirect("/users/sign_in");
        } else {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
        }
      })
    },
    signOut(req, res, next){
       req.logout();
       req.flash("notice", "You have signed out");
       res.redirect("/");
    },
    show(req, res, next){

      userQueries.getUser(req.params.id, (err, result) => {
        
       if(err || result.user === undefined){
          req.flash("notice", "No user found with that ID.");
         res.redirect("/");
        } else {
          res.render("users/show", {...result});
       }
     });
   },
   upgradePage(req, res, next){
      res.render("users/upgrade");
   },
   upgraded(req, res, next) {
    userQueries.upgrade(req.params.id, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/:id/upgrade");
      } else {
        req.flash("notice", "You've succesfully updated your account");
        res.redirect("/");
      }
    });
  },
  downgrade(req, res, next){
    res.render("users/downgrade");
  },
  downgraded(req, res, next){
    wikiQueries.privateToPublic(req.params.id);
    userQueries.downgrade(req.params.id, (err, user) => {
      if(err) {
        req.flash("error", err);
        res.redirect("/users/downgrade");
      } else {
        req.flash("notice", "You have downgraded your account");
        res.redirect("/");
      }
    });  
  }
}