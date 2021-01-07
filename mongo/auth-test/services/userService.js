const User = require('./../models/userModel');
const bcrypt = require('bcrypt');

class UserService{

  getByName(name){
    const query = User.findOne({ name }).exec();
    return query;
  };

  async createUser(data) {
    // dejar dos versiones

    try {
      const hash = await bcrypt.hash(data.password, 10);
      data.password = hash;

      const newUser = new User(data);
      return newUser.save();
    } catch (e) {
      console.log(e);
    }
  }
};


module.exports = UserService;