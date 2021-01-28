const express = require('express');
const router = express.Router();
const SaleController = require('./../controllers/saleController');
const SaleService = require('../services/saleService');
const checkAdmin = require('../utils/checkAdmin');

//Queremos crear un nuevo modelo de datos (en el mismo proyecto) para manejar las ventas de productos: [GET] /sales - [GET] /sales/:id - [GET] /sales/:user - [POST] /sales
//Queremos crear un endpoint [GET] /sales/top que nos devuelva los productos ordenados por cantidad de ventas 
//Queremos crear un endpoint [GET] /sales/top que nos devuelva los usuarios que mas ventas realizaron
//Queremos hacer que todos los metodos POST esten limitados a los usuarios que tengan isAdmin en valor true. Para esto queremos usar un middleware
//Para hacer nuestra aplicación mas segura, queremos implementar passport y validar que exista una sesion valida antes de agregar nuevos productos o ventas

const SaleInstance = new SaleController(new SaleService());

//get /sales
router.get('/', function(req, res, next) {
  SaleInstance.getSale(req, res);
});

//get /sales/top
router.get('/top', function(req, res, next) {
  SaleInstance.getTop(req, res);
});

//get /sales/:id
router.get('/:id', function(req, res, next) {
  SaleInstance.getSaleId(req, res);
});

//get /sales/:user
router.get('/user/:user', function(req, res, next) {
  SaleInstance.getSaleUser(req, res);
});

//post sales
//chequear que sea admin
router.post('/', checkAdmin, function(req, res, next) {
  SaleInstance.postSale(req, res);
});

module.exports = router;