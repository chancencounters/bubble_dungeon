const Bubble = require("./bubble");
const Gun = require("./gun");
import * as Constants from "./constants";

class Game {
  constructor(stage) {
    this.bubbles = [];
  }

  update() {
    this.gun.update();
    this.checkCollisions();
    this.renderBubbles();
  }

  start() {
    this.createBoard();
    this.renderBubbles();
    this.gun = new Gun();
    window.stage.addChild(this.gun.gun);
  }

  checkCollision(bubble, currentBubble) {
    const dx = bubble.x - currentBubble.bubble.x;
    const dy = bubble.y - currentBubble.bubble.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < 32) return true;

    return false;
  }

  checkCollisions() {
    this.allBubbles().forEach((bubble) => {
      if (this.checkCollision(bubble.bubble, this.gun.currentBubble)) {
        this.gun.currentBubble.stop();
        this.gun.currentBubble.snapBubble();
        this.gun.updateCurrentBubble();
      }
    });
  }

  allBubbles() {
    let flatBubbles = [].concat.apply([], this.bubbles);
    return flatBubbles;
  }

  createBoard() {
    for (let row = 0; row < Constants.rows; row++) {
      this.bubbles[row] = [];
      for (let col = 0; col < Constants.cols; col++) {
        if (row % 2 === 1) {
          this.bubbles[row][col] = new Bubble(
            { x: row * Constants.rowWidth + Constants.radius,
              y: col * Constants.rowHeight + Constants.radius,
            } );
        } else {
          this.bubbles[row][col] = new Bubble(
            { x: row * Constants.rowWidth + Constants.radius,
              y: col * Constants.rowHeight + (Constants.rowHeight / 2) + Constants.radius,
            } );
        }
      }
    }
  }

  renderBubbles() {
    this.allBubbles().forEach(bubble => {
      window.stage.addChild(bubble.bubble);
    });
  }

  bubbleNeighbors(bubble) {
    let grid = bubble.getBoardPosition();
    const neighbors = [];

    const deltas = grid.row % 2 === 1 ? Constants.oddDeltas : Constants.evenDeltas;

    for (let i = 0; i < deltas.length; i++) {
      let deltax = grid.row + deltas[i][1];
      let deltay = grid.col + deltas[i][0];
      if (deltax >= 0 && deltax < Constants.rows && deltay >= 0 && deltay < Constants.cols) {
        if (this.bubbles[deltax][deltay]){
          neighbors.push(this.bubbles[deltax][deltay]);
        }
      }
    }
    return neighbors;
  }
}

module.exports = Game;
