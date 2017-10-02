var http = require("http");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var path = require("path");

require(path.resolve(__dirname, "./public/player.js"));
require(path.resolve(__dirname, "./public/ball.js"));

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
            if(rooms[i].room.name = data.roomName) {
                if(rooms[i].room.full == false) {
                    rooms[i].con2 = socket;
                    rooms[i].room.player2 = data.player;

                    rooms[i].con1.emit("gameStarted", room.room);
                    rooms[i].con2.emit("gameStarted", room.room);
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

setTimeout(function() {
    for(i in rooms) {
        if(rooms[i].room.full == true) {
            rooms[i].room.ball.update();
            rooms[i].room.player1.update();
            rooms[i].room.player2.update();

            rooms[i].con1.emit("update", rooms[i].room);
            rooms[i].con2.emit("update", rooms[i].room);
        }
    }
}, 50);
