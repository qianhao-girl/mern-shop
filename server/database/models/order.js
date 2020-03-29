const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    products:[
        {
            product: { type: Object, required: true},
            quantity:{ type: Number, required: true},
            date: { type: Date}
        }
    ],
    user: {
        email:{
            type: String,
        },
        userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
        }
    }
});

module.exports = mongoose.model("Order", orderSchema);