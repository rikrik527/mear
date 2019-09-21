const mongoose = require('mongoose')
const config = require('config')
const db = config.get("mongoURI")


const connetDB = async ()=>{
    console.log(db)
    try{
       await mongoose.connect(db,{
           useNewUrlParser:true, useUnifiedTopology: true,
           useCreateIndex:true,
           useFindAndModify:false
       })
       console.log("mongodb connected...")
    } catch(err){
        console.log(err.message)
        // exit process with failure
        process.exit(1)
    }
}
module.exports = connetDB