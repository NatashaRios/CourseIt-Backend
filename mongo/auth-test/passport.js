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
      const userData = await UserInstance.getByName(username.toLowerCase());
     
      if(!userData){
        //Este usuario esta mal
        return cb(null, false);
      };
      console.log(userData.password, password);
      
      //Se le pasa primero la contraseña en texto plano, despues el hash y devuelve boolean
      const compare = await bcrypt.compare(password, userData.password);
      console.log(compare)
      if(!compare){
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