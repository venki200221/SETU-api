const axios = require('axios');
const express=require("express");
const app=express();
const bodyParser=require("body-parser");
const createdataRoute=require("./routes/createdata")
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));
const consentRoute=require("./routes/consent")
app.get("/",(req,res)=>{
res.send("hello");
})

app.use("/api/",consentRoute);
app.use("/api/",createdataRoute);

app.listen(3000,()=>{
    console.log("server running on port 3000");
})
