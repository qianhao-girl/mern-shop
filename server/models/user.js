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
    lastname: {
        type: String,
        maxlength: 50,
    },
    role:{
        type: Number,
        default: 0,
    },
    token:{
        type: String
    },
    tokenExp:{
        type:Number,
    },

});

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


const User = mongoose.model('User', UserSchema);

module.exports = { User }

