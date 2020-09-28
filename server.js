const express= require("express");
const { ExpressPeerServer } = require("peer");
const app = express();
var uuid = require("uuid");
const peerServer = ExpressPeerServer(server,{
    debg:true
});

app.use(express.static('public'))

app.use("/peerjs",peerServer);
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
const io = require("socket.io").listen(server);
io.on("connection", socket =>{
    socket.on("join-room",(roomId)=>{
        socket.join(roomId);
        socket.to(roomId).broadcast.emit("user-connected");
    });
});
