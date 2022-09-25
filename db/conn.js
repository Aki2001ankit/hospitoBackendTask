const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


// below method is for connection in database present in atlas
// there might be error due to newtork 

const DB = process.env.DATAHOUSE;

const connectdb = async() => {
    await mongoose.connect(DB).then(() => {
        console.log("database connection is successful")
    }).catch((err) => { console.log(err) });
}
connectdb();