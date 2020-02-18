const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const mongoose = require("mongoose");
const config = require('./config/key')
mongoose.connect(config.mongoURI,
    {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>console.log("connected"))
    .catch(err=>console.log(err));
const { User } = require('./models/user');

const { auth } = require('./middleware/auth');

const app = express();   
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/",(req,res) => {
    res.send("hello world!");
});

app.get("/api/users/auth", auth ,(req, res) =>{
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        lastname: req.user.lastname,
        role: req.user.role
    });
})

app.post('/api/users/register',(req, res) => {

    const user = new User(req.body);
    user.save((err, doc)=>{
        if(err) return res.json({success: false,err});
        return res.status(200).json({
            success: true,
            userData: doc
        });
    });  
})

app.post('/api/users/login',(req,res) => {
    //find the email in the database
    User.findOne({ email: req.body.email },(err,user) =>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "Authentication failed, no user registered under this email address "
            });
        }
    //the email is found in the database, the compare the password
        user.comparePassword(req.body.password,(err, isMatch)=>{
            if(!isMatch){
                return  res.json({loginSuccess: false,
                    message:"the password is not match with the email."});
            }else{
    //user loged in, generate the Token
                user.generateToken((err, user) => {
                    if(err) return res.status(400).send(err);
                    console.log(" inside generateToken");
                    res.cookie('_auth', user.token)
                    .status(200)
                    .json({loginSuccess: true});
                });
            };
        });
    }); 
});

app.get('/api/users/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id: req.user._id, token:""},(err,doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        });
    });
});
   
const port = process.env.PORT || 5000;
app.listen(port, ()=>{
    console.log(`Server Running at ${port}`);
});
