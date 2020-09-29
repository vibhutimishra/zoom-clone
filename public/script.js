const socket = io.connect("http://localhost:3000");
let myVideoStream;
const myvideo = document.createElement('video');
myvideo.muted = true;


var peer = new Peer(undefined,{
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


peer.on('open',id=>{
    socket.emit("join-room", ROOMID,id);
});

socket.on("user-connected",(userId)=>{
    connectToUser(userId,stream);
});

const connectToUser = (userId,stram)=>{
    const call = peer.call(userId,stream)
    const video = document.createElement('video')
    call.on('stream',userVideoStream=>{
        addvideoStream(video,userVideoStream)
    });
}

const addvideoStream = (video,stream)=>{
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", function(){
        video.play();
    });
    document.getElementById("video-grid").append(video);
}