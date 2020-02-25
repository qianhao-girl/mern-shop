const { User } = require('../models/User');

let auth = (req, res, next) => {
    // console.log("starting auth middleware in server");
    let token = req.cookies._auth;
    
    User.findByToken(token, (err,user) => {
        if(err) throw err;
        if(!user) return res.json({
            isAuth: false,
            error: true
        });
        // res.token = token;
        // res.user = user;
        //this req. serve as a middleman to pass info to the next 
        req.token = token;
        req.user = user;
        next();
    });

}

module.exports  = {auth};