import * as Constants from './constants';

class Bubble {
  constructor(pos, colors) {
    this.x = pos.x;
    this.y = pos.y;
    this.vx = 0;
    this.vy = 0;
    this.xCoefficient = 1;
    this.processed = false;
    this.colors = colors;
    this.createBubble();
  }

  createBubble() {
    this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    this.bubble = new createjs.Sprite(this.color.sheet, "animate");
    this.bubble.x = this.x;
    this.bubble.y = this.y;
  }

  fire(rotation) {
    let angle = this.toRadians(-1 * (rotation + 180));

    this.vx = 15 * Math.sin(angle);
    this.vy = 15 * Math.cos(angle);
  }

  update() {
    if (this.bubble.x < 0 || this.bubble.x > 380) this.xCoefficient *= -1;
    if (this.y > 400) this.stop;

    this.x += this.vx * this.xCoefficient;
    this.y += this.vy;
    this.bubble.x = this.x;
    this.bubble.y = this.y;
  }

  snapBubble() {
    this.stop();
    const pos = this.getBoardPosition();

    let bubbleX = (pos.row * Constants.rowWidth);
    let bubbleY = (pos.col * Constants.rowHeight) + Constants.radius;

    if (pos.col % 2 === 0) bubbleX += Constants.rowWidth / 2;

    this.x = bubbleX;
    this.y = bubbleY;
    this.bubble.x = bubbleX;
    this.bubble.y = bubbleY;
  }

  getBoardPosition() {
    let row = Math.floor(this.bubble.x / Constants.rowWidth);
    let col = Math.floor(this.bubble.y / Constants.rowHeight);

    if (row < 0) row = 0;
    if (row >= Constants.rows) row = Constants.rows - 1;

    return { row: row, col: col };
  }

  stop() {
    this.vx = 0;
    this.vy = 0;
  }

  toRadians (angle) {
    return angle * (Math.PI / 180);
  }
}

module.exports = Bubble;
