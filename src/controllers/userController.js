const userQueries = require("../db/queries.users.js");
const passport = require("passport");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

signup(req, res, next){
   
  res.render("users/sign_up");

 },
 create(req, res, next){
       let newUser = {
         email: req.body.email,
         password: req.body.password,
         passwordConfirmation: req.body.passwordConfirmation
       };
  
       userQueries.createUser(newUser, (err, user) => {
         if(err){
           req.flash("error", err);
           res.redirect("/users/sign_up");
         } else {
  
           passport.authenticate("local")(req, res, () => {
             req.flash("notice", "You've successfully signed in!");
             res.redirect("/");
           });
           const msg = {
            to: 'test@example.com',
            from: 'test@example.com',
            subject: 'Sending with Twilio SendGrid is Fun',
            text: 'and easy to do anywhere, even with Node.js',
            html: '<strong>and easy to do anywhere, even with Node.js</strong>',
          };
          sgMail.send(msg);
         }
       });
     }
}