var http = require("http");
var express = require("express");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);

var port = 3000;

server.listen(port);
app.use(express.static("public"));

console.log("Server started on port: " + port);

io.sockets.on("connection", function(socket) {
    socket.emit("movePlayer", {x: 100, y: 10});
});
