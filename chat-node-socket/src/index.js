const app = require("./server");
const port = 9999
const http = require('http');
const server = http.createServer(app); // Assuming you have an Express app
const io = require('socket.io')(server);
io.on('connection',(socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    console.log(" hello server setup",userData)
    socket.join(userData);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    console.log(" newMessageRecieved",newMessageRecieved)
    // var chat = newMessageRecieved.chat;
    socket.in(newMessageRecieved.receiver_id).emit("message recieved",newMessageRecieved);
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})