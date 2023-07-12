let atlasdb = require('./config').ATLASDB;

const { default: mongoose } = require('mongoose');
const { config } = require('nodemon');

module.exports = function() {
    mongoose.connect(atlasdb);

    let mongodb = mongoose.connection;

    mongodb.on("error", console.error.bind(console, "conection error: "));

    mongodb.once("open", ()=>{
        console.log("======> Connected to MongoDB")
    })

    return mongoose;
}