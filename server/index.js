const express = require("express");  
// const http = require('http');
// const socketio = require('socket.io');
const path = require("path");
// const multer = require('multer');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require("mongoose");
const config = require('./config/key')
mongoose.connect(config.mongoURI,
    {
        useNewUrlParser: true, useUnifiedTopology: true,
        useCreateIndex: true, useFindAndModify: false})
    .then(()=>console.log("mongodb database connected"))
    .catch(err=>console.log(err));

const app = express();
// const httpServer = http.createServer(app);
// const io = require('./socket').init(httpServer);
    


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

// io.on("connection",(socket) =>{
//     console.log("we have a new connection");
//     socket.on("join", () =>{
//         console.log(" joined ");
//     });
//     socket.on("disconnect",() => {
//         io.emit("one User has left");
//     })
// })

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
