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

const server = app.listen(3000, function(req, res){
    console.log("Server Started");
});
console.log(server);
const io = require("socket.io").listen(server);
io.on("connection", socket =>{
    socket.on("join-room",()=>{
        console.log("You have joined to the room");
    });
});
