function Ball() {
    this.x = width / 2;
    this.y = height / 2;
    this.r = 25;
    this.speedX = random(1) > 0.5 ? -5 : 5;
    this.speedY = random(1) > 0.5 ? -5 : 5;

    this.update = function() {
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.x - this.r < 0) {
            this.speedX *= -1;
            this.x = this.r;
        } else if(this.x + this.r > width) {
            this.speedX *= -1;
            this.x = width - this.r;
        }

        if(this.y - this.r < 0) {
            this.speedY *= -1;
            this.y = this.r;
        } else if(this.y + this.r > height) {
            this.speedY *= -1;
            this.y = height - this.r;
        }

    }

    this.render = function() {
        fill(255);
        ellipse(this.x, this.y, this.r, this.r);
    }
}
