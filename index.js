const express = require("express");
const app = express();

const mongoose = require("mongoose");
mongoose.connect('mongodb+srv://qianhao:Re9pXZW0K7RJQP4j@cluster0-bp7pi.mongodb.net/test?retryWrites=true&w=majority',
    {useNewUrlParser: true}).then(()=>console.log("connected"))
    .catch(err=>console.log(err));


app.get("/",(req,res) => {
    res.send("hello world");
});

app.listen(5000);
