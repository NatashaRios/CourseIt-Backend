const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('./services/userService');

const UserInstance = new UserService();

passport.use(new LocalStrategy({
  usernameField: 'name',
  passwordField: 'password',
}, 
async (username, password, cb) => {
  try{
    const userData = await UserInstance.getByName(username);

    if(!userData){
      return cb(null, false);
    };

    if(userData.password != password){
      return cb(null, false);
    };

    return cb(null, userData);
  }catch(e){
    return cb(null, false);
  };
}));

passport.serializeUser(async (name, cb) => {
  const data = await UserInstance.getByName(name);
  cb(null, data);
});