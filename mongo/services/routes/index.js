const express = require('express');
const router = express.Router();
const passport = require('passport');
const ProductController = require('./../controllers/productController');
const ProductService = require('./../services/productService');
const UserController = require('./../controllers/userController');
const UserService = require('./../services/userService');
const SaleController = require('./../controllers/saleController');
const SaleService = require('../services/saleService');

const ProductInstance = new ProductController(new ProductService());
const UserInstance = new UserController(new UserService());
const SaleInstance = new SaleController(new SaleService());

//Queremos crear una API para el manejo de productos: [GET] /products - [GET] /products/:id - [POST] /products - [PUT] /products/:id
//Queremos crear un nuevo modelo de datos (en el mismo proyecto) pero para usuarios: [GET] /users - [GET] /users/:id - [GET] /users/:handler - [POST] /users
//Queremos crear un nuevo modelo de datos (en el mismo proyecto) para manejar las ventas de productos: [GET] /sales - [GET] /sales/:id - [GET] /sales/:user - [POST] /sales
//Queremos crear un nuevo endpoint que nos devuelva productos relacionados para un producto en particular. Para calcular los relacionados vamos a usar la categoria del producto: [GET] /:productId/relacionados
//Queremos crear un endpoint [GET] /sales/top que nos devuelva los productos ordenados por cantidad de ventas 
//Queremos crear un endpoint [GET] /sales/top que nos devuelva los usuarios que mas ventas realizaron

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Holi');
});

//get /products
router.get('/products', function(req, res, next) {
  ProductInstance.getProduct(req, res);
});

//post /products
router.post('/products', function(req, res, next) {
  ProductInstance.postProduct(req, res);
});

//Crear un nuevo endpoint que devuelva solo los productos que tengan entrega gratis
router.get('/products/freeshipping', function(req, res, next) {
  ProductInstance.getProductFilter(req, res)
})

//get /products/:id
router.get('/products/:id', function(req, res, next){
  ProductInstance.getProductId(req, res);
});

//put /products/discount
router.put('/products/discount', function(req, res, next){
  ProductInstance.putAddProperty(req, res);
});

//put /products/:id
router.put('/products/:id', function(req, res, next){
  ProductInstance.putProduct(req, res);
});

//get /:productId/relacionados
router.get('/:productId/relacionados', function(req, res, next) {
  ProductInstance.getProductByCategory(req, res);
})

//get /users
router.get('/users', function(req, res, next) {
  UserInstance.getUser(req, res);
});

//get /users/:id
router.get('/users/:id', function(req, res, next) {
  UserInstance.getUserId(req, res);
});

//get /users/:handler
router.get('/users/handler/:handler', function(req, res, next) {
  UserInstance.getUserHandler(req, res);
});

//post /users
router.post('/users', function(req, res, next) {
  UserInstance.postUser(req, res);
});

router.post('/users/admin', passport.authenticate('local'), function (req, res, next) {
  return res.json({ok: true});
})

router.get('/users/admin', function(req, res, next) {
  return res.json({ok: true})
})

//get /sales
router.get('/sales', function(req, res, next) {
  SaleInstance.getSale(req, res);
});

//get /sales/top
router.get('/sales/top', function(req, res, next) {
  SaleInstance.getTop(req, res);
});

//get /sales/:id
router.get('/sales/:id', function(req, res, next) {
  SaleInstance.getSaleId(req, res);
});

//get /sales/:user
router.get('/sales/user/:user', function(req, res, next) {
  SaleInstance.getSaleUser(req, res);
});

//post sales
router.post('/sales', function(req, res, next) {
  SaleInstance.postSale(req, res);
});

module.exports = router;
