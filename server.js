var http = require("http");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var port = 3000;

var rooms = [];

server.listen(port);
app.use(express.static("public"));

console.log("Server started on port: " + port);

io.sockets.on("connection", function(socket) {

    socket.on("createRoom", function(data) {
        for(var i in rooms) {
            if(rooms[i].room.name == data.roomName) {
                socket.emit("roomExists");
                return;
            }
        }

        room = {
            name: data.roomName,
            player1: data.player,
            player2: null,
            full: false,
            ball: null
        };
        rooms.push({con1: socket, con2: null, room: room});

        socket.emit("roomCreated", room);
    });

    socket.on("joinRoom", function(data) {
        for(var i in rooms) {
            if(room[i].room.name = data.roomName) {
                if(room[i].room.full == false) {
                    room[i].con2 = socket;
                    room[i].room.player2 = data.player;

                    room[i].con1.emit("gameStarted", room.room);
                    room[i].con2.emit("gameStarted", room.room);
                }
                break;
            }
        }
    });

    socket.on("getAllRooms", function() {
        var r = [];
        for(var i in rooms) {
            r.push(rooms[i].room);
        }

        socket.emit("reciveAllRooms", r);
    });
});
