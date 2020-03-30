const Product = require('../database/models/product');


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
    // console.log("req.body:",req.body);
    multerUpload(req, res, err => {
        if(err){
            // console.log(err);
            return res.status(400).json({success: false, error: err}) ;
        } else{
            // console.log("req.file: ", req.file);
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
    let searchTerm = req.body.searchTerm;

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
    // console.log('findArgs: ', findArgs);

    if(searchTerm){
        console.log(searchTerm);
        Product.find(findArgs)
            .find({$text: {$search: searchTerm}})
            .populate('writer')
            .sort([[sortBy, order]])
            .skip(skip)
            .limit(limit)
            .exec((err, products) => {
                if(err) return res.status(400).json({ success: false, err});
                // console.log(products);
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
                // console.log(products);
                res.status(200).json({ success: true, products: products, amount: products.length});
            })
    }

}
//{ end of getProducts }

//begin 
exports.getProductById = (req, res, next) =>{
    let productIds = req.query.id;
    let type = req.query.type;
    // console.log("productBys: ",req.query.id);
    // let pattern = /.(?:,|\|)./;
	// console.log("dddddddddd: ",pattern.test(productIds));

    if(type==='array'){
        let ids = req.query.id.split(',');
        productIds = ids.map(id => id);
    }
    //1. The $in operator selects the documents where the value of 
    //a field equals any value in the specified array. 
    //2. If the field holds an array, then the $in operator selects the
    // documents whose field holds an array that contains
    // at least one element that matches a value in the specified array
    Product.find({'_id': { $in: productIds}})
    .populate('writer')
    .exec((err,products) => {
        if(err) return res.status(400).send(err);
        // console.log("productById",products);
        return res.status(200).send(products);
    })//products: Array
}