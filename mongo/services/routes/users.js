const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/userController');
const UserService = require('./../services/userService');
const passport = require('passport');
const checkAdmin = require('../utils/checkAdmin');

const UserInstance = new UserController(new UserService());

//Queremos crear un nuevo modelo de datos (en el mismo proyecto) pero para usuarios: [GET] /users - [GET] /users/:id - [GET] /users/:handler - [POST] /users

//get /users
router.get('/', checkAdmin, function(req, res, next) {
  UserInstance.getUser(req, res);
});

//get /users/:id
router.get('/:id', function(req, res, next) {
  UserInstance.getUserId(req, res);
});

//get /users/:handler
router.get('/handler/:handler', function(req, res, next) {
  UserInstance.getUserHandler(req, res);
});

//post /users
router.post('/', function(req, res, next) {
  UserInstance.postUser(req, res);
});

router.post('/login', passport.authenticate('local'), function(req, res, next){
  const user = {
    name: req.user.name,
    user: req.user.user,
    age: req.user.age
  };
  return res.json(user);
})

module.exports = router;