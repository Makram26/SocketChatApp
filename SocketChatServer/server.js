const express = require("express")
const app= express();

const server=require("http").createServer(app)

const io =require("socket.io")(server)

const PORT =3000

io.on("connection",socket =>{
    // console.log("a user connected : D")
    socket.on("chat message", msg=>{
     console.log(">>>>>>>>>>>>>>>>",msg)
     io.emit("chat message",msg)
    })
})

// const express = require('express');
// const http = require('http');
// const socketIO = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIO(server);

// const users = {}; // Store authenticated users

// io.on('connection', socket => {
//   console.log('User connected');

//   socket.on('authenticate', userId => {
//     users[socket.id] = userId;
//     console.log(`User ${userId} authenticated`);
//   });

//   socket.on('message', newMessage => {
//     const userId = users[socket.id];
//     if (!userId) {
//       console.log('Unauthorized message from user:', userId);
//       return;
//     }

//     const message = { ...newMessage, user: { _id: userId } };
//     io.emit('message', [message]); // Send the message as an array
//     console.log(`Message from ${userId}: ${message.text}`);
//   });

//   socket.on('disconnect', () => {
//     console.log('User disconnected');
//     delete users[socket.id];
//   });
// });

// const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
