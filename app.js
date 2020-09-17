const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname +"/index.html");
});


app.post("/", function(req, res){
  console.log("post request recieved");

  const query = req.body.cityName;
  const unit="metric";
  const apikey = "7ab6fe242e06e25acd81ee19e4bd2882";
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query+"&appid="+ apikey+"&units="+unit;


  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data",  function(data){
      const weatherdata = JSON.parse(data);
      const temp = weatherdata.main.temp;
      const desc = weatherdata.weather[0].description;
      const icon = weatherdata.weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/"+ icon +"@2x.png";

      res.write("<h1> the temperature in "+query+" is "+temp+" degree celsius</h1>" );
      res.write("<p> the weather description is "+ desc +"</p>");
      res.write("<img src+" + imageURL +">");
      res.send()
       });
  });


});








app.listen(3000, function(){
  console.log("my server is running at 3000 port");
});
