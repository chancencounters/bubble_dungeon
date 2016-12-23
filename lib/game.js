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
        this.snapBubble();
        this.gun.updateCurrentBubble();
      }
    });
  }

  snapBubble() {
    const boardPosition = this.getBoardPosition(this.gun.currentBubble);
    const row = boardPosition.row;
    const col = boardPosition.col;
    const bubbleCoords = this.getBubbleCoords(row, col);
    this.gun.currentBubble.bubble.x = (bubbleCoords.x);
    this.gun.currentBubble.bubble.y = (bubbleCoords.y);
    this.bubbles[row][col] = this.gun.currentBubble;
    const neighbors = this.bubbleNeighbors(this.bubbles[row][col]);
  }

  allBubbles() {
    let flatBubbles = [].concat.apply([], this.bubbles);
    return flatBubbles;
  }

  createBoard() {
    for (let row = 0; row < Constants.rows; row++) {
      this.bubbles[row] = [];
      for (let col = 0; col < Constants.cols; col++) {
        this.bubbles[row][col] = new Bubble(this.getBubbleCoords(row, col));
      }
    }
  }

  getBoardPosition(bubble) {
    const row = Math.floor(bubble.bubble.x / Constants.rowWidth);
    const col = Math.floor(bubble.bubble.y / Constants.rowHeight);

    return { row: row, col: col };
  }

  getBubbleCoords(row, col) {
    let bubblex = (row * Constants.rowWidth) + Constants.radius;
    let bubbley = (col * Constants.rowHeight) + Constants.radius;

    if (col % 2 === 0) {
      bubblex += Constants.rowHeight / 2;
    }

    return { x: bubblex, y: bubbley };
  }

  renderBubbles() {
    this.allBubbles().forEach(bubble => {
      window.stage.addChild(bubble.bubble);
    });
  }

  bubbleNeighbors(bubble) {
    let grid = this.getBoardPosition(bubble);
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
