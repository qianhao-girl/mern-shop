const router = require('express').Router();
const Product = require("../database/models/product");
const { auth } = require("../middleware/auth");
const productController = require('../controllers/product');


router.post('/uploadImage', auth, productController.postUploadImage);

router.post('/getProducts',productController.getProducts);

router.get('/product_by_id', productController.getProductById);

module.exports = router;
