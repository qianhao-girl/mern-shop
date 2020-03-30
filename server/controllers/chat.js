const ChatRoom =  require("../database/models/chatRoom");

//use before auth middleware
//@returns messages sort by message.moment in descending order: 20200301 > 20200204
export const getChats = (req, res, next) => {
    let user = req.user;
    let roomId = req.query.roomId;
    let userId = req.query.userId;
    ChatRoom.findOne({"_id": roomId})
    .populate("members.user")
    .exec((err,doc) => {
        if(err) return res.status(400).json({ success: false, err});

        if(doc.members && doc.members.length > 0){
            //to check whether this user are in this chatroom
            let member = Array.prototype.find.apply(doc.members, [member => member.user._id === user._id]);
            if(!member){
                return res.status(200).json({success: false, err: "no authorization, access denied"})
            }
            let enteredAt = member.enteredAt;
            //the user is in this chatroom, let's get messages created after this user entered the chatroom
            Array.prototype.sort.apply(doc.messages, [function(msg1, msg2){
                if(msg1.moment > msg2.moment){
                    return -1;
                }
                if(msg1.moment < msg2.moment){
                    return 1;
                } 
                return 0;
            }]);  //sort the messages, hoping that the algorithms behinds the Array.sort methods 
                    //has a small overheads for sorting the already sorted array
            let result = Array.prototype.filter.apply(doc.messages, [message => message.moment >= enteredAt ]);
            res.status(200).json({ success: true, messages: result});          
        }
    })


    
}