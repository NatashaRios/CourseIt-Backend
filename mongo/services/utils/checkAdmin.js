function checkAdmin (req, res, next){
  if(req.user){
    if(req.user.isAdmin){
      next();
    }else{
      res.status(403).send('You are not Admin');
    };
  }else{
    res.status(401).send('You are not login');
  };
};

module.exports = checkAdmin;