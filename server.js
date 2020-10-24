const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server)
var uuid = require("uuid");


app.use(express.static("public"));

app.get("/",function(req,res){
	var b = uuid.v4();
	res.status(200).redirect("/" + b);

});


app.get("/:room",function(req,res){
	res.render('room.ejs',{roomId: req.params.room})
});


io.on("connection", socket => {
	socket.on("join-room", (roomId, userId) => {
		console.log("RoomId is: "+roomId);
		console.log("UserId is: "+userId);
		socket.join(roomId);
		socket.to(roomId).broadcast.emit('user-connected',userId)
	});
});


server.listen(3000)