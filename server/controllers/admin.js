const Product = require('../models/product');



exports.postAddProduct = (req, res, next) => {
    const product = new Product({writer: req.user._id,...req.body});
    product.save((err) => {
        if(err) return res.status(400).json({success: false, err});
        res.status(200).json({ success: true });
    });
    // if(req.user.role === 0){
    //     return res.status(403).json({success: false, err: "only admin users have the authority to add products"});
    // }else{
    //     const product = new Product({writerId: req.user._id,...req.body});
    //     product.save((err) => {
    //         if(err) return res.status(400).json({success: false, err});
    //         res.status(200).json({ success: true });
    //     })
    // }
    
}


exports.getProducts = (req, res, next) => {
    console.log("inside getProduct controller");
    // Product.find({ userId: req.user._id})
    // .then(products => {
    //     console.log("admin-Products: ", products);
    //     return res.status(200).json({ products: products })
    // }).catch(err => {
    //    return res.status(500).json({error: err})
    // });
}



