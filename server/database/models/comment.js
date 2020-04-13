const mongoose = require("mongoose");

const commentSchema = mongoose.Schema({
    writer:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
    },
    replyTo: {
        type: mongoose.Schema.Types.ObjectId,
    },
    content: {
        type: "String",
        required: true,
    }

},{ timestamps: true,});

module.exports = mongoose.model("Comment", commentSchema);