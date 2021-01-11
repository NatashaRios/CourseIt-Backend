function checkAdmin (req, res, next) {
  if( req.user){
      if(req.user.isAdmin){
          console.log("el user es admin")
          next()
      }
      else {
          console.log("el user NO es admin")
          res.status(403).send("no sos admin")
      };
  }else{
      console.log("no hay user logueado");
      res.status(401).send("No estas logueado")
  };
};

module.exports = checkAdmin;