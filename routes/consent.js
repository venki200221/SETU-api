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
router.post("/consent",(req,res)=>{
    try{
        var data={
            "Detail": {
                "consentStart": "2023-03-06T14:12:41.974Z",
                "consentExpiry": "2023-04-06T05:44:53.822Z",
                "Customer": {
                    "id": "9999999999@onemoney"
                },
                "FIDataRange": {
                    "from": "2021-04-01T00:00:00Z",
                    "to": "2021-10-01T00:00:00Z"
                },
                "consentMode": "STORE",
                "consentTypes": [
                    "TRANSACTIONS",
                    "PROFILE",
                    "SUMMARY"
                ],
                "fetchType": "PERIODIC",
                "Frequency": {
                    "value": 30,
                    "unit": "MONTH"
                },
                "DataFilter": [
                    {
                        "type": "TRANSACTIONAMOUNT",
                        "value": "5000",
                        "operator": ">="
                    }
                ],
                "DataLife": {
                    "value": 1,
                    "unit": "MONTH"
                },
                "DataConsumer": {
                    "id": "setu-fiu-id"
                },
                "Purpose": {
                    "Category": {
                        "type": "string"
                    },
                    "code": "101",
                    "text": "Loan underwriting",
                    "refUri": "https://api.rebit.org.in/aa/purpose/101.xml"
                },
                "fiTypes": [
                    "DEPOSIT"
                ]
            },
            "context": [
                {
                    "key": "accounttype",
                    "value": "CURRENT"
                }
            ],
            "redirectUrl": "https://setu.co"
        }
        var config = {
          method: 'post',
        maxBodyLength: Infinity,
          url: 'https://fiu-uat.setu.co/consents',
          headers: { 
            'x-client-id':process.env.x-client-id,
            'x-client-secret':process.env.x-client-secret
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          res.send(response.data)
        })
        .catch(function (error) {
          res.send(error).status(500);
        });
    }catch(err){
        console.log(err)
      res.send("server error")
    }
})


router.get("/consent",(req,res)=>{
    try{
        var id=req.body.id;
        var config = {
            method: 'get',
          maxBodyLength: Infinity,
            url: `https://fiu-uat.setu.co/consents/${id}`,
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