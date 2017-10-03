var player1;
var player2;
var ball;

var me;
var master;
var room;
var gameStarted;
var gameOver;

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
	gameOver = 0;

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
		} else {
			player1.x = data.player1.x;
			player1.y = data.player1.y;
			ball.x = data.ball.x;
			ball.y = data.ball.y;
		}
	});
	socket.on("gameOver", function(data) {
		gameOver = data;
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
	if(gameStarted != true)
		return;

	if(gameOver > 0) {
		background(0);
		fill(255, 0, 0);
		textSize(32);
		text("Game Over", width / 2 - 50, height / 2);
		text("Player " + gameOver + " win", width / 2 - 50,  height / 2 + 50);
		return;
	}

	background(51);

	me.update();
	if(master) {
		ball.update();

		if(ball.x < 0) {
			socket.emit("gameOver", { room: room, playerWin: 2 });
		} else if(ball.x > width) {
			socket.emit("gameOver", { room: room, playerWin: 1 });
		}

		if(player1.checkBallCollision(ball)) {
			ball.speedX = random(1, 5);
		} else if(player2.checkBallCollision(ball)) {
			ball.speedX = random(-5, -1);
		}

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
