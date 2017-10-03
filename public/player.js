function Player(x, y) {
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 100;
    this.speedY = 0;

    this.moveDown = function(goDown) {
        if(goDown == true) {
            this.speedY += 5;
        } else {
            this.speedY -= 5;
        }
    }

    this.moveUp = function(goUp) {
        if(goUp == true) {
            this.speedY -= 5;
        } else {
            this.speedY += 5;
        }
    }

    this.checkBallCollision = function(ball) {
        var distX = Math.abs(ball.x - this.x - this.width / 2);
        var distY = Math.abs(ball.y - this.y - this.height / 2);

        if(distX > (this.width / 2 + ball.r) ||
           distY > (this.height / 2 + ball.r)) {
            return false;
        }

        if(distX < rect.width / 2 ||
           distY < rect.height / 2) {
            return true;
        }

        var dx = distX - this.width / 2;
        var dy = distY - this.height / 2;
        return (dx * dx + dy * dy <= (ball.r * ball.r));
    };

    this.update = function() {
        this.y += this.speedY;
        if(this.y < 0) {
            this.y = 0
        } else if(this.y + this.height > height) {
            this.y = height - this.height;
        }
    }

    this.render = function() {
        fill(255);
        rect(this.x, this.y, this.width, this.height);
    }
}
