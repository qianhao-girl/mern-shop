const mongoose = require('mongoose');


const ChatRoomSchema = mongoose.Schema({
    messages: [
        {
            author:{
                type: mongoose.SchemaTypes.ObjectId,
            },
            content:{
                type: String,
                required: true,
            },
            time:{
                type: Date,
                required: true,
            }
        }
    ],
    roomType: {
        type: String,
        enum: ["1:1","1:n","n:n","n:1"],
    },
    members:[{
        type: mongoose.SchemaTypes.ObjectId,
        ref: "User",
    }]
},{timestamps: true,});


const ChatRoom = mongoose.model("ChatRoom",ChatRoomSchema);
exports.module = ChatRoom;