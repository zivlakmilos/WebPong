var http = require("http");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var path = require("path");

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
            ball: data.ball
        };
        rooms.push({con1: socket, con2: null, room: room});

        socket.emit("roomCreated", room);
    });

    socket.on("joinRoom", function(data) {
        for(var i in rooms) {
            if(rooms[i].room.name = data.roomName) {
                if(rooms[i].room.full == false) {
                    rooms[i].room.full = true;
                    rooms[i].con2 = socket;
                    rooms[i].room.player2 = data.player;

                    rooms[i].con1.emit("gameStarted", rooms[i].room);
                    rooms[i].con2.emit("gameStarted", rooms[i].room);
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

    socket.on("updateMaster", function(data) {
        for(var i in rooms) {
            if(rooms[i].room.name == data.name) {
                if(data.full != true)
                    break;
                rooms[i].room.player1 = data.player1;
                rooms[i].room.ball = data.ball;
                rooms[i].con2.emit("update", rooms[i].room);
            }
        }
    });
    socket.on("updateSlave", function(data) {
        for(var i in rooms) {
            if(rooms[i].room.name == data.name) {
                if(data.full != true)
                    break;
                rooms[i].room.player2 = data.player2;
                rooms[i].con1.emit("update", rooms[i].room);
            }
        }
    });

    socket.on("gameOver", function(data) {
        for(var i in rooms) {
            if(rooms[i].room.name == data.room.name) {
                rooms[i].con1.emit("gameOver", data.playerWin);
                rooms[i].con2.emit("gameOver", data.playerWin);
            }
        }
    });
});
