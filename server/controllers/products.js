const Product = require('../models/product');


//{ begin of image file upload }
const multer = require('multer');
let multerCustomStorage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'uploads/images/') //boilerplate/uploads/images/
    },
    filename: function(req, file, cb){
        cb(null, `${Date.now()}_${file.originalname}`)
    }
});
let multerUpload = multer({ storage: multerCustomStorage}).single('image');
exports.postUploadImage = (req, res) => {
    console.log("req.body:",req.body);
    multerUpload(req, res, err => {
        if(err){
            console.log(err);
            return res.status(400).json({success: false, error: err}) ;
        } else{
            console.log("req.file: ", req.file);
            return res.status(200).json({success: true,  image: req.file.path, fileName: req.file.filename })
        }
    })
}
//{ end of image file upload }


//{ begin of getProducts }
exports.getProducts = (req, res) => {
    const order = req.body.desc ? req.body.desc : 'desc';
    const sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    const skip = req.body.skip ? parseInt(req.body.skip) : 0;
    const limit = req.body.limit ? parseInt(req.body.limit): 50;
    
    let findArgs = {};

    if(req.body.filters){
        for(let key in req.body.filters){
            if(req.body.filters[key].length >0){
                if(key==='price'){
                    findArgs[key] = {
                        $gte: req.body.filters[key][0],
                        $lte: req.body.filters[key][1],
                    }
                // else{}
                }
            }
        }
    }
    console.log('findArgs: ', findArgs);

    if(req.body.searchTerm){
        console.log(searchTerm);
        Product.find(findArgs)
            .find({$text: {$search: req.body.searchTerm}})
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if(err) return res.status(400).json({ success: false, err});
                console.log(products);
                res.status(200).json({ success: true, products: products, amount: products.length});
            })
    }else{
        Product.find(findArgs)
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if(err) return res.status(400).json({ success: false, err});
                console.log(products);
                res.status(200).json({ success: true, products: products, amount: products.length});
            })
    }

}


//{ end of getProducts }