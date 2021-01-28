const express = require('express');
const router = express.Router();
const ProductController = require('./../controllers/productController');
const ProductService = require('./../services/productService');
const checkAdmin = require('../utils/checkAdmin');

const ProductInstance = new ProductController(new ProductService());

//Queremos crear una API para el manejo de productos: [GET] /products - [GET] /products/:id - [POST] /products - [PUT] /products/:id
//Crear un nuevo endpoint que devuelva solo los productos que tengan entrega gratis [GET] /products/freeshipping
//Queremos crear un nuevo endpoint que nos devuelva productos relacionados para un producto en particular. Para calcular los relacionados vamos a usar la categoria del producto: [GET] /:productId/relacionados
//Queremos hacer que todos los metodos POST esten limitados a los usuarios que tengan isAdmin en valor true. Para esto queremos usar un middleware
//Para hacer nuestra aplicación mas segura, queremos implementar passport y validar que exista una sesion valida antes de agregar nuevos productos o ventas

//get /products
router.get('/', function(req, res, next) {
  ProductInstance.getProduct(req, res);
});

//post /products
router.post('/', checkAdmin, function(req, res, next) {
  ProductInstance.postProduct(req, res);
});

//Crear un nuevo endpoint que devuelva solo los productos que tengan entrega gratis
router.get('/freeshipping', function(req, res, next) {
  ProductInstance.getProductFilter(req, res)
})

//get /products/:id
router.get('/:id', function(req, res, next){
  ProductInstance.getProductId(req, res);
});

//put /products/discount
router.put('/discount', checkAdmin, function(req, res, next){
  ProductInstance.putAddProperty(req, res);
});

//put /products/:id
router.put('/:id', checkAdmin, function(req, res, next){
  ProductInstance.putProduct(req, res);
});

//get /:productId/relacionados
router.get('/:productId/related', function(req, res, next) {
  ProductInstance.getProductByCategory(req, res);
})

module.exports = router;