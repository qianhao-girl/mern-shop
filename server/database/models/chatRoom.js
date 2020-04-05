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
            moment:{
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
        user:{
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
        },
        enteredAt:{
            type: Date,
            required: true,
        }
    }],
    accessibility:{
        type: String,
        enum: ["open","private" ]
    }
},{timestamps: true,});



// get all the messages after the user enter this ChatRoom
// ChatRoomSchema.methods.getChatsByUser = (userId) => {
//     const enteredAt = this.members.find(member => member.user === userId).enteredAt;
//     let deepCopiedMessageArray;
    // this.messages.forEach(messageObject => {
    //     let newMessageObject = { };
    //     for(let key in messageObject){
    //         let valueType = typeof(messageObject[key]);
    //         switch(valueType){
    //             case "number": return messageObject[key]

    //         }
    //     }
    //     return {
    //         author: messageObject.author,
    //     }
    // })

    // let messagesSortedByTimeDesc = this.message.
// }


module.exports = mongoose.model("ChatRoom",ChatRoomSchema);