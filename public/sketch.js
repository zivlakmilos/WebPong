var player1;
var player2;
var ball;

var socket;

function setup() {
	createCanvas(windowWidth, windowHeight);
	player1 = new Player(10, 100);
	player2 = new Player(width - 10 - player1.width, 100);
	ball = new Ball();

	socket = io.connect();

	socket.on("movePlayer", function(data) {
		player2.x = data.x;
		player2.y = data.y;
	});
}

function keyPressed() {
	if(keyCode == UP_ARROW) {
		player1.moveUp(true);
	} else if(keyCode == DOWN_ARROW) {
		player1.moveDown(true);
	}

	return false;
}

function keyReleased() {
	if(keyCode == UP_ARROW) {
		player1.moveUp(false);
	} else if(keyCode == DOWN_ARROW) {
		player1.moveDown(false);
	}
}

function draw() {
	background(0);

	player1.update();
	player2.update();
	ball.update();

	player1.render();
	player2.render();
	ball.render();
}
