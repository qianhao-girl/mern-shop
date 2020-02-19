const router = require('express').Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

router.get("/auth", auth ,(req, res) =>{
    res.status(200).json({
        _id: req._id,
        isAuth: true,
        email: req.user.email,
        lastname: req.user.lastname,
        role: req.user.role
    });
});

router.post('/register',(req, res) => {

    const user = new User(req.body);
    user.save((err, doc)=>{
        if(err) return res.json({success: false,err});
        return res.status(200).json({
            success: true,
            userData: doc
        });
    });  
})

router.post('/login',(req,res) => {
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

router.get('/logout', auth, (req,res) => {
    User.findOneAndUpdate({_id: req.user._id, token:""},(err,doc) => {
        if(err) return res.json({success: false, err});
        return res.status(200).send({
            success: true
        });
    });
});


module.exports = router;
