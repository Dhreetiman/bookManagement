const express = require("express")
const mongoose = require("mongoose")
const route = require("./route/route")
const multer = require("multer")

const app = express()
app.use(multer().any())

app.use(express.json())

app.use("/", route)



mongoose.connect("mongodb+srv://Lucifer:lucifer123@mycluster.bdqxxtr.mongodb.net/group20Database?retryWrites=true&w=majority",{
    useNewUrlParser:true
}).then(()=>console.log("MongoDB Connected"))
.catch((err)=>console.log(err))

app.listen(3000, ()=>{
    console.log("Server runnig on port",3000)
})