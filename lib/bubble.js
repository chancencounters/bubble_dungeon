import * as Constants from "./constants";

class Bubble {
  constructor(pos, givenColor = false) {
    this.x = pos.x;
    this.y = pos.y;
    this.xCoefficient = 1;
    this.shot = false;
    this.colors = [Constants.blue, Constants.red, Constants.yellow, Constants.green];
    this.createBubble(givenColor);
  }

  createBubble(givenColor) {
    if (givenColor) {
      this.colors.forEach(color => {
        if (color.color === givenColor) {
          this.color = color;
        }
      });
    } else {
      this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
    
    this.bubble = new createjs.Sprite(this.color.sheet, "animate");
    this.bubble.x = this.x;
    this.bubble.y = this.y;
  }

  move() {
    //makes sure the projectile bounces off walls
    if (this.bubble.x < 0) {
      this.xCoefficient *= -1;
    } else if (this.bubble.x > 570) {
      this.xCoefficient *= -1;
    }

    let angle = this.toRadians(-1 * (this.angle + 180));

    this.bubble.x += this.xCoefficient * 5 * Math.sin(angle);
    this.bubble.y += 5 * Math.cos(angle);
  }

  fire(angle) {
    this.shot = true;
    this.angle = angle;
  }

  update() {
    if (this.shot === true) {
      this.move();
    } else {
      return;
    }
  }

  snapBubble() {
    const boardPosition = this.getBoardPosition();
    let bubbleX = (boardPosition.row * Constants.rowWidth) + Constants.radius;
    let bubbleY = (boardPosition.col * Constants.rowHeight) + Constants.radius;

    if (boardPosition.col % 2 === 0) {
      bubbleX += Constants.rowHeight / 2;
    }

    this.x = bubbleX;
    this.y = bubbleY;
  }


  getBoardPosition() {
    const row = Math.floor(this.bubble.x / Constants.rowWidth);
    const col = Math.floor(this.bubble.y / Constants.rowHeight);

    return { row: row, col: col };
  }

  stop() {
    this.shot = false;
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }
}

module.exports = Bubble;
