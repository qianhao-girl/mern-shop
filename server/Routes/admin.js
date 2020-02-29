const router = require('express').Router();
const {auth} = require('../middleware/auth');
const adminController = require('../controllers/admin');



router.get("/products", auth , adminController.getProducts);
router.post("/add-product", auth, adminController.postAddProduct);

module.exports = router;