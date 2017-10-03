var player1;
var player2;
var ball;

var me;
var master;
var room;
var gameStarted;

var socket;

var canvasWidth = 800;
var canvasHeight = 300;

function setup() {
	createCanvas(canvasWidth, canvasHeight);
	player1 = new Player(10, 100);
	player2 = new Player(width - 10 - player1.width, 100);
	ball = new Ball();
	me = player1;
	master = false;
	gameStarted = false;

	socket = io.connect();

	socket.on("roomCreated", function(data) {
		room = data;
		master = true;
	});
	socket.on("update", function(data) {
		room = data;
		if(master == true) {
			player2.x = data.player2.x;
			player2.y = data.player2.y;
			console.log(data);
		} else {
			player1.x = data.player1.x;
			player1.y = data.player1.y;
			ball.x = data.ball.x;
			ball.y = data.ball.y;
		}
	});
}

function keyPressed() {
	if(keyCode == UP_ARROW) {
		me.moveUp(true);
	} else if(keyCode == DOWN_ARROW) {
		me.moveDown(true);
	}
}

function keyReleased() {
	if(keyCode == UP_ARROW) {
		me.moveUp(false);
	} else if(keyCode == DOWN_ARROW) {
		me.moveDown(false);
	}
}

function draw() {
	background(51);

	if(gameStarted != true)
		return;

	me.update();
	if(master) {
		ball.update();
		room.ball = ball;
		room.player1 = player1;
		socket.emit("updateMaster", room);
	} else {
		room.player2 = player2;
		socket.emit("updateSlave", room);
	}

	player1.render();
	player2.render();
	ball.render();
}
