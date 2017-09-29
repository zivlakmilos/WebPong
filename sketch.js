var player1;
var player2;
var ball;

function setup() {
	createCanvas(windowWidth, windowHeight);
	player1 = new Player(10, 100);
	player2 = new Player(width - 10 - player1.width, 100);
	ball = new Ball();
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
