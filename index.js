const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require("mongoose");
const config = require('./config/key')
mongoose.connect(config.mongoURI,
    {useNewUrlParser: true}).then(()=>console.log("connected"))
    .catch(err=>console.log(err));
const { User } = require('./models/user');

const app = express();   
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("hello world!");
});



app.post('/api/users/register',(req, res) => {

    const user = new User(req.body);
    user.save((err, userData)=>{
        if(err) return res.json({success: false,err});
        return res.status(200).json({
            success: true
        });
    });

    
})

console.log("port: 5000")
app.listen(5000);
