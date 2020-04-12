const router = require('express').Router();
const Product = require("../database/models/product");
const { auth } = require("../middleware/auth");
const productController = require('../controllers/product');
const VideoControllers = require('../controllers/video');


router.post('/uploadImage', auth, productController.postUploadImage);
router.post('/uploadVideo', auth, VideoControllers.postUploadVideo);

router.post('/getProducts',productController.getProducts);

router.get('/product_by_id', productController.getProductById);

router.post('/saveComment', auth, productController.postComment);
router.get('/getComments', productController.getComments);

module.exports = router;

