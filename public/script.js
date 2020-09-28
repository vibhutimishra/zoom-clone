const socket = io.connect("http://localhost:3000");
let myVideoStream;
const myvideo = document.createElement('video');
myvideo.muted = true;


var peer = new peer(undefined,{
    path:'/peerjs',
    host:'/',
    port:'3000'
});

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: true
}).then(stream =>{
    myVideoStream = stream;
    addvideoStream(myvideo,stream)
});

socket.emit("join-room", ROOMID);
socket.on("user-connected",()=>{
    connectToUser();
});

const connectToUser = ()=>{
    console.log("new user");
}

const addvideoStream = (video,stream)=>{
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", function(){
        video.play();
    });
    document.getElementById("video-grid").append(video);
}