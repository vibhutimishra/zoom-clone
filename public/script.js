const socket = io.connect("http://localhost:3000");

const myPeer = new Peer(undefined,{
	host:"/",
	port:"3001"
});

myPeer.on('open', id=>{
	socket.emit("join-room", ROOMID, id);
});

socket.on('user-connected', userId =>{
	console.log("user connected "+ userId);
});

const videoGrid = document.getElementById('video-grid');
let myVideoStream;
const myvideo = document.createElement("video");
myvideo.muted = true;

navigator.mediaDevices
	.getUserMedia({
		video: true,
		audio: true,
	}).then(stream => {
		myVideoStream = stream;
		addvideoStream(myvideo, stream);

		myPeer.on("call",call=>{
			call.answer(stream)
			const video = document.createElement("video")
			call.on('stream',userVideoStream=>{
				addvideoStream(video,userVideoStream)
			});
		});

		socket.on("user-connected", userId=>{
			connectToNewUser(userId,stream)
		});
	});


//whenever new user added accept the video stream and create video-grid
function connectToNewUser(userId,stream){
	const call= myPeer.call(userId,stream)
	const video = document.createElement('video')
	call.on("stream",userVideoStream=>{
		addvideoStream(video,userVideoStream)
	})
	// when user disconnected close the video immidiately
	call.on('close',()=>{
		video.remove()
	});
}

//creating video-grid out video stream
function addvideoStream(video, stream){
	video.srcObject = stream;
	video.addEventListener("loadedmetadata", ()=>{
		video.play();
	});
	videoGrid.append(video);
};
