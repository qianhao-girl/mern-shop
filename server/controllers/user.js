const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const config = require('../config/key');
const User = require('../database/models/user');
const Product = require('../database/models/product');

//{ begin of reset password }
const transporter = nodemailer.createTransport(
  sendgridTransport({
	auth: {
	  api_key:
		config.sendGridApiKey,
	}
  })
);

exports.postResetPassword = (req, res, next) => {
	// console.log("postResetPassword",req.body)
	crypto.randomBytes(32, (err, buffer) => {
		if(err){
			// console.log("res.redirect('/reset'): ",err);
			return res.redirect('/reset');
		}else{
			const token = buffer.toString('hex');
			// console.log("token: before ", token)
			User.findOne({ email: req.body.email })
				.then(user => {
					if(!user){
						res.status(200).json({error: 'No account with that email found.'});
						return res.redirect('/reset');
					}else{
						user.resetToken = token;
						user.resetTokenExpiration = Date.now() + 3600000;
						return user.save();
					}
				})
				.then(result => {
					// console.log("token:after: ",token)
					transporter.sendMail({
						to: req.body.email,
						from: 'shop@test.com',
						subject: 'Password reset',
						html: `
						  <p>You requested a password reset</p>
						  <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
						  <p>Please do not contact us with this emaill address: shop@test.com, which is send by ... </p>
						`
					  });
				})
		}
	})
}

exports.getNewPassword = (req, res, next) => {
	// console.log("getNewPassword req.params: ", req.params);
	// console.log("getNewPassword req.body: ", req.body);
	const token = req.params.token;
	User.findOne({ resetToken: token,resetTokenExpiration:{$gt: Date.now()} })
		.then(user => {
			if(!user){
				// console.log("user didnot found")
				res.json({
					success: false,
					error: "token has already been expired!"
				})
			}else{
				// console.log("token validated!")
				res.status(200).json({ success: true })
			}
		}).catch(err => {
			// console.log(err);
			res.json({
				success: false,
				error: err
			})
		})
}

exports.postNewPassword = (req, res, next) => {
	// console.log("postNewPassword req.params: ", req.params);
	// console.log("postNewPassword req.body: ", req.body);
	let newPassword = req.body.newPassword;
	let token = req.body.resetToken;
	User.findOne({ resetToken: token, resetTokenExpiration: {$gt: Date.now()} })
		.then(user => {
			if(!user) {
				// res.json({ error: "token has already been expired!"}); 
			// console.log("cannot found such user");
				return res.redirect("/home");
			}
			else{
				user.password = newPassword;
				user.resetToken = undefined;
				user.resetTokenExpiration = undefined;
				return user.save();
			}
		}).then(result => {
			// if(result) res.redirect('/login'); not work
			res.status(200).json({success: true})
		}).catch(err => console.log("err in postNewPassword: ", err));
	
}
//{ end of reset password }


//{begin of add one item to the user cart}
//!!!important: use after auth(req.user)
exports.addToCart = (req, res, next) => {
	const productId = req.query.productId;
	const addNum = req.query.amount ? parseInt(req.query.amount) : 1;
	let user = req.user;
	//Use $ in the projection document of the find() method or the findOne() method
	// when you only need one particular array element in selected documents.
	if(user.cart && user.cart.items && user.cart.items.some(element => element.productId == productId)){
		User.findOneAndUpdate(
			{ _id: user._id, "cart.items.productId": productId },
			{ $inc: {"cart.items.$.quantity": addNum } },//https://docs.mongodb.com/manual/reference/operator/update/positional/
			{new: true},//set return the updated document
			(err,doc) => {
				if(err) return res.status(400).json({success: false, err});
				res.status(200).json({success: true, cart: doc.cart});

		});
	}else{
		User.findOneAndUpdate({_id: req.user._id},
			{ $push: {//https://docs.mongodb.com/manual/reference/operator/update/push/
				'cart.items':{ productId: productId,  quantity: addNum }
			}},
			{new: true},
			(err,doc) => {
				if(err) return res.status(400).json({success: false, err});
				res.status(200).json({success: true, cart: doc.cart});
		});
	}
	
}

//{end of add one item to the user cart}


exports.removeFromCart = (req, res, next) => {
	// https://docs.mongodb.com/manual/reference/operator/update/pull/#up._S_pull
	console.log("req.query.id: ", req.query.id);
	let productIds = req.query.id;

	let pattern = /.(?:,|\|)./;
	if(pattern.test(productIds)){
		productIds = [];
		productIds = req.query.id.split(',');
	};


	//!!!won't work, array pass to query in GET will ignore the bracket
	// if(productIds.startsWith('[') && productIds.endsWith(']')){
	// 	productIds = [];
	// 	productIds = req.query.id.split(',');
	// }

	User.findOneAndUpdate(
		{_id: req.user._id},
		{ $pull: {'cart.items': {productId: {$in: productIds}} } },
		{new: true},
		(err,doc) => {
			if(err) return res.staus(400).json({success: false, err});
			res.status(200).json({success: true, cart: doc.cart})
		}
	)
	
	// User.findOneAndUpdate(
	// 	{_id: req.user._id},
	// 	{ $pull: {'cart.items': {productId: req.query.id} } },
	// 	{new: true},
	// 	(err,userDoc) => {
	// 		if(err) return res.staus(400).json({success: false, err});
	// 		let productIds = userDoc.cart.items.map(item => {
	// 			return item.productId
	// 		})
	// 		Product.find({_id: {$in: productIds}})
	// 		.populate('writer')
	// 		.exec((err,products) => {
	// 			if(err) return res.staus(400).json({success: false, err});
	// 			res.status(200).json({ cartProductsDatails: products, cart: userDoc.cart })
	// 		})
	// 	}
	// )
}

exports.reverseCheckFromCart = (req, res, next) => {
	let productIds = [req.query.id];
	if(req.query.type==="array"){
		productIds = req.query.id.split(",");	
	}
	User.findOne({_id: req.user._id}, (err,doc) => {
		if(err) {
			console.log("err in reverseCheckFromCart: ", err);
			return res.status(400).json({ success: false, err});
		}
		doc.reverseCheckFromCart(productIds).then( userDoc => {
			if(userDoc){
				console.log("userDoc in reverseCheckFrom Cart controller: ",userDoc);
				res.status(200).json({success: true, cart: userDoc.cart});
			}else{
				res.status(400).json({ success: false });
			}
		})
	})
}

exports.decreaseInCart = (req, res, next) => {
	let productId;//TODO: = req.?.?(productId)
	User.findOneAndUpdate(
		{_id: req.user._id, 'cart.items':{ productId: productId, quantity: {$gte: 2} }},
		{$inc: {"cart.items.$.quantity": -1 }},
		{ new: true },
		(_, userDoc) => {
			if(userDoc) return res.status(200).json({success: true, cart: userDoc.cart});
			User.findOneAndUpdate(
				{_id: req.user._id, 'cart.items':{ productId: productId, quantity: {$lte: 1} }},
				{$pull: { "cart.items": {productId: productId} }},
				{ new: true },
				(err,doc) => {
					if(err) return res.staus(400).json({success: false, err}); 
					res.status(200).json({success: true, cart: doc.cart})
				})
		}	
	)	
}


//get array of products in cart
exports.getUserCartDetail = (req, res, next) => {
	User.findOne({_id: req.user._id},(err,doc) => {
		if(err) return res.status(400).json({success: false});
		if(doc){
			let cartItems = doc.cart.items;
			let array = cartItems.map(item => item.productId);

			Product.find({'_id': {$in: array}})
			.populate('writer')
			.exec((err,products) =>{
				if(err) return res.status(400).json({success: false});
				if(products){
					products.forEach((product,index) =>{
						for(let index in cartItems){
							if(cartItems[index].productId === product._id){
								products[index].quantity = cartItems[index].quantity;
								products[index].checked = cartItems[index].checked;
								break;	
							}
						}	
					})				
				};
				res.status(200).json({success: true, cartDetail: products, cart: cart});
			})
		}
	})
}

//TODO:
exports.getUserCartDetailByShop = (req, res, next) =>{

}