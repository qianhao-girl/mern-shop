const mongoose = require("mongoose");
const config = require('../config/key');

let db;
module.exports = {
    init: () => {
        db = mongoose.connect(config.mongoURI,
            {
                useNewUrlParser: true, useUnifiedTopology: true,
                useCreateIndex: true, useFindAndModify: false})
            .then(()=>console.log("mongodb database connected"))
            .catch(err=>console.log(err));
        return db;
    },
    getDb: () => {
        if(!db){
            throw new Error("mongodb database had trouble in initializing")
        }else{
            return db;
        }       
    }

}
