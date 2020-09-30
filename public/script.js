const socket = io.connect("http://localhost:3000");
socket.emit("join-room", ROOMID);
let myVideoStream;
const myvideo = document.createElement("video");
myvideo.muted = true;

navigator.mediaDevices
	.getUserMedia({
		video: true,
		audio: true,
	})
	.then(stream => {
		myVideoStream = stream;
		addvideoStream(myvideo, stream);
	});

const addvideoStream = (video, stream) => {
	video.srcObject = stream;
	video.addEventListener("loadedmetadata", function () {
		video.play();
	});
	document.getElementById("video-grid").append(video);
};
