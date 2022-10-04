const express= require("express");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extented: true}));

app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  var num1= Number(req.body.num1);
  var num2= Number(req.body.num2);
  var result=num1+num2;
  res.send("The result of the calculator is: "+result);
});

app.get("/bmicalculator",function(req,res){
  res.sendFile(__dirname+"/bmiCalculator.html");
});

app.post("/bmicalculator",function(req,res){
  var weight=parseFloat(req.body.w);
  var height=parseFloat(req.body.h);
  var bmi=weight/(height*height/10000);
  res.send("Your BMI is: "+bmi);
});

app.listen("3000", function(){
  console.log("calculator is running on server port 3000");
});
