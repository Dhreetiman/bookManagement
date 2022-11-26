const express = require('express');
const mongoose = require('mongoose');
const route = require("./route/route");
const app = express();

app.use(express.json());

app.use("/", route);


mongoose.connect("mongodb+srv://Lucifer:lucifer123@mycluster.bdqxxtr.mongodb.net/groupXDatabase?retryWrites=true&w=majority", { 
    useNewUrlParser: true
}).then(()=> console.log("MongoDB Connected successfully"))
.catch((err)=> console.log(err))

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`Server is running on port ${3000}`)
})
