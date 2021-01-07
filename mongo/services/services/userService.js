const User = require('./../models/userModel');

class UserService{

  //get de los users
  getUser(){
    const query = User.find();
    return query;
  };

  //agregar usuarios
  addUser(user){
    const newUser = new User(user);
    return newUser.save();
  };

  //get de los users según el id
  getUserId(id){
    const query = User.findOne({_id: id}).exec();
    return query;
  };

  //get de los users según el handler
  getUserHandler(handler){
    const query = User.findOne({user: handler}).exec();
    return query;
  };

  getByName(name){
    const query = User.findOne({ name }).exec();
    return query;
  };

}

module.exports = UserService;