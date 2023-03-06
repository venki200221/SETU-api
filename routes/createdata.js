const router=require("express").Router();
const axios=require("axios");
const bodyParser=require("body-parser");
const dotenv=require("dotenv");
const express=require("express")
const app=express()
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
    extended: false
}));
dotenv.config;
router.post("/createdata",(req,res)=>{
    try{
        var data={
                "consentId":req.body.id,
                "DataRange": {
                  "from": "2021-04-01T00:00:00Z",
                  "to": "2021-10-01T00:00:00Z"
                },
                "format": "json"
             }
        
        var config = {
            method: 'post',
          maxBodyLength: Infinity,
            url: 'https://fiu-uat.setu.co/sessions',
            headers: { 
                'x-client-id':process.env.x-client-id,
                'x-client-secret':process.env.x-client-secret
            },
            data:data
          };
        
        axios(config)
        .then(function (response) {
          res.send(response.data)
        })
        .catch(function (error) {
          console.log(error)
          res.send(error).status(500);
        });
    }catch(err){
      res.send("server error")
    }
})


router.get("/getdata",(req,res)=>{
    try{
        var id=req.body.id;
        var config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://fiu-uat.setu.co/sessions/${id}`,
            headers: { 
                'x-client-id':process.env.x-client-id,
                'x-client-secret':process.env.x-client-secret
            },
          };
          
          axios(config)
          .then(function (response) {
            res.send(response.data);
          })
          .catch(function (error) {
            res.send(error).status(400)
          });
    }
    catch(err){
      res.send(err);
    }
})

module.exports=router;
