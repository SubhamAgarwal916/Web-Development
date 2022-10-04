const express= require("express");
const app =express();
app.get("/",function(request,response){
  response.send("<h1>Hello</h1>");
});

app.get("/contact", function(req,res){
  res.send("contact me at :subhamagrwal916@gmail.com");
});
 app.get("/about", function(req,res){
    res.send("<h1>My Name is Subham Agarwal</h1>")
 });

 app.get("/hobbies", function(req,res){
   res.send("Waching Anime, Watching series,Travelling");
 });

app.listen(3000, function(){
  console.log("server started on port 3000");
});
