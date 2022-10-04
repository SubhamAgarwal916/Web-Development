const express= require("express");
const https= require("https");
const bodyParser=require("body-parser");

const app=express();

app.use(bodyParser.urlencoded({extented:true}));


app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/",function(req,res){
  const query=req.body.cityName;
  const apiKey="d471d5e5aea472ebd865f99842a9eab1";
  const units=req.body.units;
  var tempUnit="degrees Celcius";
  if(units=="standard"){
    tempUnit="Kelvin";
  }
  else if (units=="imperial") {
    tempUnit="Fahrenheit";
  }
  const url="https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData= JSON.parse(data);
      const temp=weatherData.main.temp;
      const description=weatherData.weather[0].description;
      const icon=weatherData.weather[0].icon;
      const imageUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
      res.write("<h1>The temprature in "+query+" is "+temp+" "+tempUnit+"</h1>");
      res.write("<p>The Weather is currently "+description+". <p>");
      res.write("<img src="+imageUrl+">");
      res.send();
    });
  });
})

app.listen(3000,function(){
  console.log("WeatherAPI running over port 3000");
});
