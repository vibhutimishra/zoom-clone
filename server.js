const express= require("express");
const app = express();
var uuid = require("uuid");

app.use(express.static('public'))


app.get("/",function(req,res){
    var b= uuid.v4();  
    res.status(200).redirect("/"+b);
});

app.get("/:room",function(req,res){
    res.render("room.ejs",{roomId: req.params.room })
});


app.listen("4000", function(req, res){
    console.log("Server Started");
});