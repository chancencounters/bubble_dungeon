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

  move(rotation) {
    let angle = this.toRadians(-1 * (rotation + 180));

    this.vx = 15 * Math.sin(angle);
    this.vy = 15 * Math.cos(angle);
    this.inverseVx = -this.vx;
    this.inverseVy = -this.vy;
  }

  update() {
    if (this.bubble.x < 0 || this.bubble.x > 370) this.xCoefficient *= -1;
    if (this.bubble.y > 400) this.stop;

    this.bubble.x += this.vx * this.xCoefficient;
    this.bubble.y += this.vy;
  }

  getBoardPosition() {
    let col = Math.round(this.bubble.y / Constants.rowHeight);
    let row;
    if (col % 2 === 0) {
      row = Math.round((this.bubble.x - 16) / Constants.rowWidth)
    } else {
      row = Math.round(this.bubble.x/ Constants.rowWidth);
    }

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
