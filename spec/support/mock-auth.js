module.exports = {
  
    fakeIt(app){
  
      let name, email, id, password, role;
  
      function middleware(req, res, next){
  
        role = req.body.role || role;
        name = req.body.name || name;
        id = req.body.userId || id;
        email = req.body.email || email;
        password = req.body.password || password;
  
        if(id && id != 0){
          req.user = {
            "id": id,
            "email": email,
            "name": name,
            "password": password,
            "role": role
          };
        } else if(id == 0) {
          delete req.user;
        }
  
        if( next ){ next() }
      }

      function route(req,res){
        res.redirect("/")
      }
  
      app.use(middleware)
      app.get("/auth/fake", route)
    }
  }