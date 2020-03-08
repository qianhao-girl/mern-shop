const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    writer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' ,
        required: true
     },
    title:{
        type: String,
        maxlength: 50,
        required: true,
    },
    price:{
        type: Number,
        default: 0
    },
    description: {
        type:String,
        required: true,
    },
    images:{
        type: Array,
        default: []
    },
    videos:{
        type: Array,
        default: []
    },
    stock:{
        type: Number,
        default: 0
    },
    sold:{
        type: Number,
        default: 0
    },
    views:{
        type: Number,
        default: 0
    },
    country:{
        type: String,
    }
    
},{ timestamps: true })


productSchema.index({
    title: 'text',
    description: 'text',
}, {
    weights:{
        title: 5,
        description: 1
    },
    name: "textindex"
})

const Product = mongoose.model('product', productSchema);

module.exports = Product;