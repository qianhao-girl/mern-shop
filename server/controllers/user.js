const crypto = require('crypto');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');

const config = require('../config/key');
const {User} = require('../models/user');

//{ begin of reset password }
const transporter = nodemailer.createTransport(
  sendgridTransport({
    auth: {
      api_key:
        config.sendGridApiKey,
    }
  })
);

exports.postResetPassword = (req, res, next) => {
    console.log("postResetPassword",req.body)
    crypto.randomBytes(32, (err, buffer) => {
        if(err){
            console.log("res.redirect('/reset'): ",err);
            return res.redirect('/reset');
        }else{
            const token = buffer.toString('hex');
            console.log("token: before ", token)
            User.findOne({ email: req.body.email })
                .then(user => {
                    if(!user){
                        res.status(200).json({error: 'No account with that email found.'});
                        return res.redirect('/reset');
                    }else{
                        user.resetToken = token;
                        user.resetTokenExpiration = Date.now() + 3600000;
                        return user.save();
                    }
                })
                .then(result => {
                    console.log("token:after: ",token)
                    transporter.sendMail({
                        to: req.body.email,
                        from: 'shop@test.com',
                        subject: 'Password reset',
                        html: `
                          <p>You requested a password reset</p>
                          <p>Click this <a href="http://localhost:3000/reset/${token}">link</a> to set a new password.</p>
                          <p>Please do not contact us with this emaill address: shop@test.com, which is send by ... </p>
                        `
                      });
                })
        }
    })
}

exports.getNewPassword = (req, res, next) => {
    console.log("getNewPassword req.params: ", req.params);
    console.log("getNewPassword req.body: ", req.body);
    const token = req.params.token;
    User.findOne({ resetToken: token,resetTokenExpiration:{$gt: Date.now()} })
        .then(user => {
            if(!user){
                console.log("user didnot found")
                res.json({
                    success: false,
                    error: "token has already been expired!"
                })
            }else{
                console.log("token validated!")
                res.status(200).json({ success: true })
            }
        }).catch(err => {
            console.log(err);
            res.json({
                success: false,
                error: err
            })
        })
}

exports.postNewPassword = (req, res, next) => {
    console.log("postNewPassword req.params: ", req.params);
    console.log("postNewPassword req.body: ", req.body);
    let newPassword = req.body.newPassword;
    let token = req.body.resetToken;
    User.findOne({ resetToken: token, resetTokenExpiration: {$gt: Date.now()} })
        .then(user => {
            if(!user) {
                // res.json({ error: "token has already been expired!"}); 
            console.log("cannot found such user");
                return res.redirect("/home");
            }
            else{
                user.password = newPassword;
                user.resetToken = undefined;
                user.resetTokenExpiration = undefined;
                return user.save();
            }
        }).then(result => {
            // if(result) res.redirect('/login'); not work
            res.status(200).json({success: true})
        }).catch(err => console.log("err in postNewPassword: ", err));
    
}
//{ end of reset password }


