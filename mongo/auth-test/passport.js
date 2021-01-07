const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('./services/userService');
const bcrypt = require('bcrypt');

const UserInstance = new UserService();

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password'
  }, 
  async (username, password, cb) => {
    try{
      const userData = await UserInstance.getByName(username);
     
      if(!userData){
        //Este usuario esta mal
        return cb(null, false);
      };
      
      const compare = await bcrypt.compare(password, userData.password);
      console.log(compare)
      if(userData.password != password){
        //Este usuario esta mal
        return cb(null, false);
      };

      //Este usuario esta bien
      return cb(null, userData);
    }catch(e){
      //Este usuario esta mal
      return cb(null, false);
    };
  })
);

passport.serializeUser((user, cb) => {
  cb(null, user.name);
});

passport.deserializeUser(async (name, cb) => {
  const data = await UserInstance.getByName(name);

  cb(null, data);
});