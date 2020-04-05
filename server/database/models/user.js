const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = mongoose.Schema({
    name:{
        type:String,
        maxlength: 50,
    },
    email:{
        type: String,
        trim:true,
        unique: 1
    },
    password:{
        type:String,
        minlength: 5
    },
    role:{
        type: Number,
        default: 0,
    },
    token:{
        type: String
    },
    resetToken: String,
    resetTokenExpiration: Date,
    cart: {
        items: [
          {
            productId: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Product',
              required: true
            },
            quantity: { type: Number, required: true },
            checked: {
                type: Boolean,
                default: true,
            }
          }
        ]
    },
    history: [
        {
          productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
          },
          date: {
              type: Date,
              required: true
          }
        }
    ]
},{ timestamps: true });

UserSchema.pre('save', function( next ){
    var user = this;

    if(user.isModified('password')){
        bcrypt.hash(user.password, 10, function(err, hash){
            if(err) next(err);
            user.password = hash; 
            next();       
        } )
    }else{
        next();
    }   
});

UserSchema.methods.comparePassword = function(plainPassword,callback){
    bcrypt.compare(plainPassword, this.password, function(err,isMatch){
        if(err) return callback(err);
        callback(null, isMatch);
    });
}

UserSchema.methods.generateToken = function(callback){
    var user = this;
    var token = jwt.sign(user._id.toHexString(),'secret');
    user.token = token;
    user.save(function (err, user){
        if(err) return callback(err);
        callback(null, user);
    })
}

UserSchema.statics.findByToken = function (token, callback){
    var user = this;
    jwt.verify(token,'secret',function(err, decode){
        user.findOne({"_id": decode, "token":token}, function (err,user){
            if(err) return callback(err);
            // if(!user) console.log("unverified");
            callback(null, user);
        });
    });
}


UserSchema.methods.addToCart = function(product, num=1){
    const productIndex = this.cart.items.findIndex(item => item.productId.toString() === product._id.toString());
    const updatedCartItems = [...this.cart.items];
    let newQuantity = 1;

    if(productIndex > -1){
        newQuantity = this.cart.items[productIndex].quantity + num;
        updatedCartItems[productIndex].quantity = newQuantity;

    }else{
        newQuantity = num;
        updatedCartItems.push({ productId: product._id, quantity: newQuantity});
    }

    const updatedCart = { items: updatedCartItems };
    this.cart = updatedCart;
    return this.save();

};

UserSchema.methods.removeFromCart = function(productId,num=1){
    const productIndex = this.cart.items.findIndex(item => item.productId.toString() === productId.toString());
    const updatedCartItems = [...this.cart.items];
    newQuantity = 1;
    if(productIndex > -1){
        if(updatedCartItems[productIndex].quantity <= num){
            updatedCartItems.splice(productIndex, 1);
        }else{
            newQuantity = this.cart.items[productIndex].quantity - num;
            updatedCartItems[productIndex].quantity = newQuantity;
        }
        this.cart = {items: updatedCartItems}
    }
    return this.save();
};

UserSchema.methods.reverseCheckFromCart = function(productIds){
    // @parameters productIds:Array[ObjectId]
    // console.log("this in user model method reverse...: ", this);
    console.log("productIds: ",productIds);
    let updatedCartItems = [...this.cart.items];
    updatedCartItems.forEach((cartItem,index) => {
        productIds.forEach((productId) => {
            if(cartItem.productId.toString() === productId){
                console.log("hasMatched!")
                updatedCartItems[index].checked = !updatedCartItems[index].checked; 
            }
        });        
    });
    console.log("updatedCartItems: ",updatedCartItems);
    this.cart.items = updatedCartItems;
    return this.save();
}

UserSchema.methods.clearCart = function (){
    this.cart = { items:[] };
    return this.save();
}

const User = mongoose.model('User', UserSchema);
module.exports = User;

