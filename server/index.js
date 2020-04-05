const express = require("express");  
const path = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const connect = require("./database/db").init();
const app = express();
const httpServer = require('http').Server(app);
const io = require('./socket').init(httpServer);
const ChatRoom = require('./database/models/chatRoom');
    


app.use(cors());
//'image' must match with the form field name in multipart/form-data
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());


app.use('/uploads', express.static(path.join(__dirname,'../uploads')));
app.get("/",(req,res) => {
    res.send("hello world!");
});

app.use('/api/user', require('./routes/user'));
app.use('/api/product', require('./routes/product'));
app.use('/api/admin',require('./routes/admin'));
app.use("/api/chat",require('./routes/chat'));

//This client(socket) will receive any events that the client emits from their browser.  
io.on('connection', socket => {
    socket.on("Start A Chat Room", msg => {
        connect.then(db => {
            try{
                let chatRoom = msg.chatMessage ? new ChatRoom({
                    messages:[{
                        authorId,
                        content: msg.chatMessage,
                        time: msg.submitTime,
                    }],
                    roomType: msg.ChatRoomType,
                    members: [msg.userId, ...msg.counterpartId],
                })  : new ChatRoom({
                    roomType: msg.ChatRoomType,
                    members: [msg.userId, ...msg.counterpartId],
                })
                chatRoom.save((err,doc) => {
                    if(err) return res.status(400).json({ success: false, err: err});
                    if(doc) return socket.emit("Output Chat Message", doc);
                })
            }
            catch(error){
                console.error(error);
            }
        })
    });

    socket.on("Input Chat Message", msg => {
        
    })
})




// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
    // Set static folder
    app.use(express.static("client/build"));
    // index.html for all page routes
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}
   
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server Running at ${port}`);
});
