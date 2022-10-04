//jshint esversion: 6

const express=require("express");
const path = require('path');
const request=require("request");
const bodyParser=require("body-parser");
const https=require("https");
const mailchimp = require("@mailchimp/mailchimp_marketing");

const app=express();

// client.setConfig({apiKey: "d18b91fa4016bc93a057613d311e4a15-us13",  server: "us13",});
// mailchimp.setConfig({
//   apiKey: 'e7215d2cac7d3d48d5577064e77716ef',
//   server: 'us13',
// });
app.use(express.static('public'));

app.use(bodyParser.urlencoded({extented:true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const fName=req.body.fName;
    const lName=req.body.lName;
    const mail=req.body.email;

    const data={
      members:[
        {
          email_address: mail,
          status: "subscribed",
          merge_fields: {
            FNAME: fName,
            LNAME: lName
          }
        }
      ]
    };
//     const subscribingUser = {
//     firstName:fName,
//     lastName:lName,
//     email:mail
//     };
//     async function run() {
//     // const response = await mailchimp.lists.addListMember("77215e7479", {
//     const response = await mailchimp.lists.createList({
//     email_address: subscribingUser.email,
//     status: "subscribed",
//     merge_fields: {
//       FNAME: subscribingUser.firstName,
//       LNAME: subscribingUser.lastName
//     }
//   });
//
//   console.log(
//     `Successfully added contact as an audience member. The contact's id is ${
//       response.id
//     }.`
//   );
// }
//
// run();

    const jsonData = JSON.stringify(data);
    const url="https://us13.api.mailchimp.com/3.0/lists/77215e7479"
    const option={
      method:"post",
      auth: "subham d18b91fa4016bc93a057613d311e4a15-us13"
    }

    const request=https.request(url,option,function(response){
      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })
    request.write(jsonData);
    request.end();


});

app.listen(3000,function(){
    console.log("server is running");
})
