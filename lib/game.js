const Bubble = require("./bubble");
const Gun = require("./gun");

class Game {
  constructor(stage) {
    this.bubbles = [];
    this.rows = 16;
    this.cols = 7;
    this.rowHeight = 30;
    this.rowWidth = 34;
    this.radius = 16;
    this.bubbleHeight = 32;
    this.bubbleWidth = 32;
  }

  start() {
    this.createBubbles();
    this.renderBubbles();
    const gun = new Gun();
    window.stage.addChild(gun.gun);
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
    let bubblex = (x * this.rowWidth) + this.radius;
    let bubbley = (y * this.rowHeight) + this.radius;

    if (y % 2 === 0) {
      bubblex += this.rowHeight / 2;
    }

    return { x: bubblex, y: bubbley };
  }

  renderBubbles() {
    for (let x = 0; x < this.rows; x++) {
      for (let y = 0; y < this.cols; y++) {
        window.stage.addChild(this.bubbles[x][y].bubble);
      }
    }
  }
}

module.exports = Game;
