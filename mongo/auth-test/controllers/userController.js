class UserController{
  constructor(userService){
    this.userService = userService;
  }
    
  async createUser(req, res){
    const { body } = req;
    const name = body.name.toLowerCase();

    if(body && body.name && body.password){
      try{
       const user = await this.userService.createUser({...body, name});
       console.log(user)
       res.status(200).json(user);
      }catch(e){
        console.log(e);
      };
    }else {
      return res.sendStatus(400);
    };
  };
};

module.exports = UserController;