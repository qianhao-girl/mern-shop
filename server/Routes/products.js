const router = require('express').Router();
const Product = require("../models/product");
const { auth } = require("../middleware/auth");
const productController = require('../controllers/products');


router.post('/uploadImage', auth, productController.postUploadImage);

router.post('/getProducts',productController.getProducts);
module.exports = router;
