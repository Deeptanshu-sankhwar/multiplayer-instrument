const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const port = process.env.PORT || 8080;

var users = {}; //contains every sockets id and room it is connected to

app.use(express.static(path.join(__dirname, '../../build')));

app.get('/', (req, res, next) => res.sendFile(__dirname + './index.html'));

var roomId = ""
// sockets test
io.on('connection', socket => {
    console.log('connected', socket.id);

    socket.on('roomToJoin', (room) => {
        roomId = room;
        socket.join("room-" + roomId);
    });

    //restriciting per room to two members
    // if(io.nsps['/'].adapter.rooms["room-"+roomno] && io.nsps['/'].adapter.rooms["room-"+roomno].length > 1) {
    //     roomno++;
    // }

    //join socket to a specific room


    socket.on('selected instrument', (instrument) => {
        users[socket.id] = {
            instrument: instrument,
            roomId: roomId
        };
        // console.log(socket.id, users[socket.id])
        console.log(users);

    });

    socket.on('sendFromDrums', (key) => {
        // console.log("room-"+users[socket.id].roomId);
        socket.in("room-"+users[socket.id].roomId).emit('receiveFromDrums', key);
    });

    socket.on('sendFromGuitar', (selectedNote) => {
        // console.log("room-"+users[socket.id].roomId);
        socket.in("room-"+users[socket.id].roomId).emit('receiveFromGuitar', selectedNote);
    });

    socket.on('sendFromPiano', (sound)  =>  {
        // console.log("room-"+users[socket.id].roomId);
        socket.in("room-"+users[socket.id].roomId).emit('receiveFromPiano', sound);
    });

    socket.on('disconnect', function()  {
        delete users[socket.id];
        console.log('user disconnected');
    });
})

server.listen(port);
