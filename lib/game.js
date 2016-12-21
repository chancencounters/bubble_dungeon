const Bubble = require("./bubble");

class Game {
  constructor(stage) {
    this.bubbles = [];
    this.rows = 13;
    this.cols = 8;
    this.rowHeight = 36;
    this.rowWidth = 36;
    this.radius = 18;
    this.bubbleHeight = 36;
    this.bubbleWidth = 36;
  }

  createBubbles() {
    for (let x = 0; x < this.rows; x++) {
      this.bubbles[x] = [];
      for (let y = 0; y < this.cols; y++) {
        this.bubbles[x][y] = new Bubble(this.getBubbleCoords(x, y));
      }
    }
  }

  getBubbleCoords(x, y) {
    if (x % 2 === 0) {
      
    } else {

    }

    y = y * this.bubbleHeight;
    return { x: x, y: y };
  }
}
